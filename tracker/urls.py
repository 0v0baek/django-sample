from django.urls import path
from . import views

app_name = 'tracker'

urlpatterns = [
    path('', views.home, name='home'),
    path('save_data/', views.save_data_view, name='save_data'),
    ]
