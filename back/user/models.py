from django.db import models
from django.contrib.auth.models import AbstractUser
from post.models import Post


class UserModel(AbstractUser):

    coins = models.IntegerField(default=0) # read_only
    followers = models.ForeignKey('self', on_delete=models.CASCADE, related_name='follower', blank=True, null=True)
    following = models.ForeignKey('self', on_delete=models.CASCADE, related_name='followings', blank=True, null=True)
    # favourites = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='favourites', blank=True, null=True)
    
class Followers(models.Model):
    pass
    
class Followings(models.Model):
    pass