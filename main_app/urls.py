from django.urls import path
from . import views

urlpatterns = [
    path('profile',views.home,name='home')
]