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
    path('shows/reviews/add', views.ShowReviewList.as_view(), name='new_show_review'),
    path('movie/reviews/add', views.MovieReviewList.as_view(), name='new_movie_review'),
    path('movies/<int:movie_id>/reviews', views.showReviewsByMovie, name="show_current_movie_reviews"),
    path('shows/<int:show_id>/reviews', views.showReviewsByShow, name="show_current_show_reviews")
]