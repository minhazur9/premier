from django.shortcuts import render
from rest_framework import permissions, status
from .serializers import *
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import json

# show all profiles
def profiles(request):
    allProfiles = Profile.objects.all()
    allProfiles = serializers.serialize('python',allProfiles)
    allProfiles = [d['fields'] for d in allProfiles]
    allProfiles = json.dumps(allProfiles)
    return HttpResponse(allProfiles)

# show all movie recs by all users
def movies(request):
    allMovies = Movie.objects.all()
    allMovies = serializers.serialize('json',allMovies)
    return HttpResponse(allMovies)

# show all show rec by all users
def shows(request):
    allShows = Show.objects.all()
    allShows = serializers.serialize('json',allShows)
    return HttpResponse(allShows)

# show your profile
def profile(request,profile_id):
    profile = Profile.objects.filter(id=profile_id)
    profile = serializers.serialize('python',profile)
    profile = [d['fields'] for d in profile]
    profile = json.dumps(profile)
    return HttpResponse(profile)

# show movie recs by specific user
def movieRecs(request,user_id):
    movies = Movie.objects.filter(user=user_id)
    movies = serializers.serialize('python',movies)
    movies = [d['fields'] for d in movies]
    movies = json.dumps(movies)
    return HttpResponse(movies)

# show show rec by specific user
def showRecs(request,user_id):
    shows = Show.objects.filter(user=user_id)
    shows = serializers.serialize('python',shows)
    shows = [d['fields'] for d in shows]
    shows = json.dumps(shows)
    return HttpResponse(shows)

# delete user's movie recs
def deleteMovieRecs(request,user_id,movie_id):
    movies = Movie.objects.filter(user=user_id).filter(movie_id=movie_id).delete()
    return HttpResponse(movies)

# delete user's show recs
def deleteShowRecs(request,user_id,show_id):
    shows = Show.objects.filter(user=user_id).filter(show_id=show_id).delete()
    return HttpResponse(shows)

# show all movie reviews
def movieReviews(request):
    reviews = Review.objects.exclude(movie_id__isnull=True)
    reviews = serializers.serialize('python',reviews)
    reviews = [d['fields'] for d in reviews]
    reviews = json.dumps(reviews)
    return HttpResponse(reviews)

# show all show reviews
def showReviews(request):
    reviews = Review.objects.exclude(show_id__isnull=True)
    reviews = serializers.serialize('python',reviews)
    reviews = [d['fields'] for d in reviews]
    reviews = json.dumps(reviews)
    return HttpResponse(reviews)

def showReviewsByMovie(request,movie_id):
    reviews = Review.objects.filter(movie_id=movie_id)
    reviews = serializers.serialize('python',reviews)
    reviews = [d['fields'] for d in reviews]
    reviews = json.dumps(reviews)
    return HttpResponse(reviews)

def showReviewsByShow(request,show_id):
    reviews = Review.objects.filter(show_id=show_id)
    reviews = serializers.serialize('python',reviews)
    reviews = [d['fields'] for d in reviews]
    reviews = json.dumps(reviews)
    return HttpResponse(reviews)

class CurrentUser(APIView):

    authentication_classes = (JSONWebTokenAuthentication,)
    permissions_classes = (permissions.AllowAny, )

    def get(self,request,format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.data['username'])
            Profile.objects.create(user=user,first_name=user.first_name,last_name=user.last_name)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShowList(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    
    def post(self, request, format=None):
        serializer = ShowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShowReviewList(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    def post(self, request, format=None):
        serializer = ShowReviewSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieList(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    def post(self, request, format=None):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MovieReviewList(APIView):
    authentication_classes = (JSONWebTokenAuthentication, )
    def post(self, request, format=None):
        serializer = MovieReviewSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




        