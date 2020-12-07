from django.urls import path
from . import views

urlpatterns = [
    path('profiles/',views.profiles,name='all_profiles'),
    path('current_user/', views.CurrentUser.as_view(), name='current_user'),
    path('users/', views.UserList.as_view(), name='all_users'),
    path('movies/', views.movies, name='all_movies'),
    path('shows/', views.shows, name='all_shows'),
    path('shows/add', views.ShowList.as_view(), name='add_show'),
    path('profiles/<int:user_id>/shows/',views.showRecs, name="find_shows"),
    path('profiles/<int:user_id>/shows/<int:show_id>/delete', views.deleteShowRecs, name="delete_show"),
    path('movies/add', views.MovieList.as_view(), name="add_movie"),
    path('profiles/<int:user_id>/movies/<int:movie_id>/delete', views.deleteMovieRecs, name="delete_movie"),
    path('profiles/<int:user_id>/movies/', views.movieRecs, name="find_movies"),
    path('profiles/<int:profile_id>/', views.profile, name="profile"),
    path('movies/reviews', views.movieReviews, name="all_movie_reviews"),
    path('shows/reviews', views.showReviews, name="all_show_reviews"),
]