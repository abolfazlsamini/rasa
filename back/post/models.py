from datetime import datetime
from django.db import models
from requests import post


class Pages(models.Model):# or could be episodes or something
    page_title = models.CharField(max_length=100, blank=False)
    text = models.TextField(blank=False)
    video = ''
    picture = ''

    def __str__(self):
        return self.page_title
    
class Chapter(models.Model):
    post_title = models.CharField(max_length=100, blank=False)
    pages = models.ManyToManyField(Pages,related_name='pages', blank=True) # maybe blank = False
    chapter = models.ManyToManyField('self', blank=True)
    def __str__(self):
        return self.post_title  

class Post(models.Model):
    post_title = models.CharField(max_length=100, blank=False)
    post = models.ManyToManyField(Chapter,related_name='post', blank=True)
    chapter = models.ManyToManyField(Chapter,related_name='chapters', blank=True)
    created_date = models.DateTimeField(auto_now=True)
    last_modified_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post_title
        