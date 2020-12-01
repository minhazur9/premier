from django.urls import path
from . import views

urlpatterns = [
    path('profiles/',views.profiles,name='all_profiles'),
    path('current_user/', views.CurrentUser.as_view(), name='current_user'),
    path('users/', views.UserList.as_view(), name='all_users'),
    path('movies/', views.movies, name='all_movies'),
    path('shows/', views.shows, name='all_shows')
]