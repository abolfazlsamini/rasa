from django.db import models
from django.contrib.auth.models import AbstractUser
from post.models import Post


class Followers(models.Model):
    pass
    
class Followings(models.Model):
    pass

# class Post(models.Model):
#     post = models.ManyToManyField(Post, related_name='posts', blank=True, null=True)


class UserModel(AbstractUser):

    coins = models.IntegerField(default=0) # read_only
    followers = models.ForeignKey('self', on_delete=models.CASCADE, related_name='follower', blank=True, null=True)
    following = models.ForeignKey('self', on_delete=models.CASCADE, related_name='followings', blank=True, null=True)
    favourites = models.ManyToManyField(Post, related_name='favourites', blank=True)
    posts = models.ManyToManyField(Post, related_name='posts', blank=True)
    