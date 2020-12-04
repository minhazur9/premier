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


# Create your views here.

# class ProfileView(generics.CreateAPIView):
#     allProfiles = Profile.objects.all()
#     serializer_class = ProfileSerializer


# @api_view(['GET'])
# @permission_classes((IsAuthenticated, ))
# @authentication_classes((JSONWebTokenAuthentication,))

def profiles(request):
    allProfiles = Profile.objects.all()
    allProfiles = serializers.serialize('python',allProfiles)
    allProfiles = [d['fields'] for d in allProfiles]
    allProfiles = json.dumps(allProfiles)
    return HttpResponse(allProfiles)

def movies(request):
    allMovies = Movie.objects.all()
    allMovies = serializers.serialize('json',allMovies)
    return HttpResponse(allMovies)

def shows(request):
    allShows = Show.objects.all()
    allShows = serializers.serialize('json',allShows)
    return HttpResponse(allShows)

def profile(request,profile_id):
    profile = Profile.objects.filter(id=profile_id)
    profile = serializers.serialize('json',profile)
    return HttpResponse(profile)

def movieRecs(request,user_id):
    movies = Movie.objects.filter(user=user_id)
    movies = serializers.serialize('python',movies)
    movies = [d['fields'] for d in movies]
    movies = json.dumps(movies)
    return HttpResponse(movies)

def showRecs(request,user_id):
    shows = Show.objects.filter(user=user_id)
    shows = serializers.serialize('python',shows)
    shows = [d['fields'] for d in shows]
    shows = json.dumps(shows)
    return HttpResponse(shows)

def deleteMovieRecs(request,user_id,movie_id):
    movies = Movie.objects.filter(user=user_id).filter(movie_id=movie_id).delete()
    return HttpResponse(movies)

def deleteShowRecs(request,user_id,show_id):
    shows = Show.objects.filter(user=user_id).filter(show_id=show_id).delete()
    return HttpResponse(shows)
    

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


class MovieList(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    def post(self, request, format=None):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        