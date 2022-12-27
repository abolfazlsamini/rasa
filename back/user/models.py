from django.db import models
from django.contrib.auth.models import AbstractUser
# from post.models import Post, Pages


class UserModel(AbstractUser):

    coins = models.IntegerField(default=0) # read_only
    followers = models.ManyToManyField('self', blank=True)
    following = models.ManyToManyField('self', blank=True)
    # favourites = models.ManyToManyField(Post, related_name='favourites', blank=True)
    # posts = models.ForeignKey(Post, related_name='posts', blank=True, on_delete=models.DO_NOTHING)
    