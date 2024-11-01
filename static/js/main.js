$(function () {
  /**
   * 「保存」ボタンがクリックされた際にBMIを計算して一覧に反映させる
   *
   * @param {string} height
   * @param {string} weight
   * @returns
   */
  function calculate(height, weight) {
    let numHeight = 0;
    let numWeight = 0;
    // 身長の未入力チェック
    if (!height || height == "" || height == 0) {
      alert("身長が入力されていません");
      return;
    }
    // 体重の未入力チェック
    if (!weight || weight == "" || weight == 0) {
      alert("体重が入力されていません");
      return;
    }

    numHeight = parseFloat(height);
    numWeight = parseFloat(weight);

    // 身長をcmからmに変換
    var heightMeter = numHeight / 100;
    // BMIを計算（体重÷身長(m)÷身長(m)
    var BMI = (numWeight / heightMeter / heightMeter).toFixed(2);
    // 適正体重を計算（身長(m)×身長(m)×22）
    var healthyWeight = (heightMeter * heightMeter * 22).toFixed(2);

    // テーブルを更新する

    return {
      healthyWeight: healthyWeight,
      BMI: BMI,
    };
  }

  /**
   * 「クリア」ボタンがクリックされた際に一覧をすべてクリアする
   */
  function clearAll(isClear) {
    // 入力欄をクリアする
    if (isClear) {
      $("#height").val("");
      $("#weight").val("");
      $("#weight").val("");
    }
  }

  /**
   * 初期処理（ボタンクリック時のイベントを設定）
   */
  function init() {
    // 「クリア」ボタンを押した佐野処理を設定
    document.getElementById("btn_clear").addEventListener("click", function () {
      clearAll(true);
    });
    // 「保存」ボタンを押した際の処理を設定
    $("#btn_save").on("click", function () {
      // pythonに渡すための、身長・体重・適正体重・比較・BMIを取得
      var height = document.getElementById("height").value;
      var weight = document.getElementById("weight").value;
      var name = document.getElementById("name").value;
      if (!height || height == "" || height == 0) {
        alert("身長が入力されていません");
        return;
      }
      if (!weight || weight == "" || weight == 0) {
        alert("体重が入力されていません");
        return;
      }

      // BMIと適正体重を計算
      var result = calculate(height, weight);
      if (!result) {
        return; // 計算に失敗した場合、処理を中断
      }

      // パラメータを作成してAJAX通信
      var parameter = {
        height: height,
        weight: weight,
        healthy_weight: result.healthyWeight,
        bmi: result.BMI,
      };

      if (name) {
        parameter.name = name;
      }

      var url = "/save_data/";
      $.ajax({
        url: url,
        type: "POST",
        data: parameter,
      }).then(
        function (msg) {
          console.log("Django 通信成功：" + msg);
          alert("保存に成功しました");
          clearAll();
        },
        function (error, error2) {
          console.log("Django 通信エラー ： " + error);
          alert("保存時にエラーが発生しました");
        }
      );
    });
  }

  init();
});
