from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    profile_pic = models.ImageField(null=False)
    username = models.CharField(max_length=255)
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Movie(models.Model):
    movie_id = models.IntegerField()
    title = models.CharField(max_length=255)
    user= models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} from {self.user.username}'s list"

class Show(models.Model):
    show_id = models.IntegerField()
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} from {self.user.username}'s list"

class Review(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    title = models.CharField(max_length=255,blank=True)
    content = models.TextField()
    movie_id = models.IntegerField(null=True, blank=True)
    show_id = models.IntegerField(null=True,blank=True)
    score = models.IntegerField()

    def __str__(self):
        return f"Review made by {self.user.username}"


