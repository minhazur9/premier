from django.urls import path
from . import views

urlpatterns = [
    path('profiles/',views.profiles,name='all_profiles'),
    path('current_user/', views.CurrentUser.as_view(), name='current_user'),
    path('users/', views.UserList.as_view(), name='all_users'),
    path('movies/', views.movies, name='all_movies'),
    path('shows/', views.shows, name='all_shows'),
    path('shows/add', views.ShowList.as_view(), name='add_show'),
    path('movies/add', views.MovieList.as_view(), name="add_movie")
]