from django.shortcuts import render
from rest_framework import generics
from .serializers import ProfileSerializer
from django.core import serializers
from django.http import HttpResponse
from .models import *
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


# Create your views here.

# class ProfileView(generics.CreateAPIView):
#     allProfiles = Profile.objects.all()
#     serializer_class = ProfileSerializer


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
@authentication_classes((JSONWebTokenAuthentication,))
def home(request):
    allProfiles = Profile.objects.all()
    allProfiles = serializers.serialize('json',allProfiles)
    return HttpResponse(allProfiles)