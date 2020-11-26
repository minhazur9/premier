from django.shortcuts import render
from rest_framework import generics
from .serializers import ProfileSerializer
from django.core import serializers
from django.http import HttpResponse
from .models import *

# Create your views here.

# class ProfileView(generics.CreateAPIView):
#     allProfiles = Profile.objects.all()
#     serializer_class = ProfileSerializer

def home(request):
    allProfiles = Profile.objects.all()
    allProfiles = serializers.serialize('json',allProfiles)
    return HttpResponse(allProfiles)