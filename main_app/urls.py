from django.urls import path
from . import views

urlpatterns = [
    path('profiles/',views.profiles,name='all_profiles'),
    path('current_user/', views.current_user, name='current_user')
]