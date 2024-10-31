from django.db import models

class BodyData(models.Model):
    class Meta:
        db_table = 'my_body_data'

    name = models.CharField(max_length=72, default='ユーザー', verbose_name="名前")
    height = models.PositiveIntegerField(null=True, verbose_name='身長')
    weight = models.PositiveIntegerField(null=True, verbose_name='体重')
    healthy_weight = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='適性体重')
    bmi = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='BMI')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='計測日')