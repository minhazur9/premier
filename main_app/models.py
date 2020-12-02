from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    profile_pic = models.ImageField(null=False)
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Movie(models.Model):
    movie_id = models.IntegerField()
    title = models.CharField(max_length=255)
    user= models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Show(models.Model):
    show_id = models.IntegerField()
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.title

