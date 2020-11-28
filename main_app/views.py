from django.shortcuts import render
from rest_framework import permissions, status
from .serializers import ProfileSerializer, UserSerializer, UserSerializerWithToken
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.models import User
from rest_framework.response import Response


# Create your views here.

# class ProfileView(generics.CreateAPIView):
#     allProfiles = Profile.objects.all()
#     serializer_class = ProfileSerializer


# @api_view(['GET'])
# @permission_classes((IsAuthenticated, ))
# @authentication_classes((JSONWebTokenAuthentication,))

def profiles(request):
    allProfiles = Profile.objects.all()
    allProfiles = serializers.serialize('json',allProfiles)
    return HttpResponse(allProfiles)

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


def new_user(self, request, format=None):
    serializer = UserSerializerWithToken(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)