from django.shortcuts import render
from rest_framework import generics
from .serializers import ProfileSerializer
from .models import *

# Create your views here.

class ProfileView(generics.CreateAPIView):
    allProfiles = Profile.objects.all()
    serializer_class = ProfileSerializer