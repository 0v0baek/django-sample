from django.shortcuts import render
from django.http import JsonResponse
from decimal import Decimal
from .models import BodyData

def home(request):
    if request.method == 'GET':
        all_bodydata = BodyData.objects.all().order_by('-created_at')
        return render(request, 'main.html', {'body_data': all_bodydata})

def save_data_view(request):
    if request.method == 'POST':
        try:
            print(request.POST)
            my_bodydata = BodyData()
            my_bodydata.height = int(request.POST.get('height', 0))
            my_bodydata.weight = int(request.POST.get('weight', 0))
            my_bodydata.healthy_weight = Decimal(request.POST.get('healthy_weight', 0.0))
            my_bodydata.bmi = Decimal(request.POST.get('bmi', 0.0))
            my_bodydata.save()
            return JsonResponse({"status": "success", "message": "保存成功"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"{e}"})