from django.shortcuts import render
from rest_framework import permissions, status
from .serializers import ProfileSerializer, UserSerializer, UserSerializerWithToken
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView


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


class CurrentUser(APIView):

    permission_classes = (permissions.IsAuthenticated,)

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
            Profile.objects.create(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



        