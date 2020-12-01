from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from .models import *


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True,required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True,validators=[UniqueValidator(queryset=User.objects.all())])


    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']

        print(validated_data)
        instance = self.Meta.model(**validated_data)
        # if password is not None:
        instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name', 'last_name','email')

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ('id','first_name','last_name','user')

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('movieId','title','profile')

class ShowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Show
        fields = ('showId','title','profile')