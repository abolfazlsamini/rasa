from django.db import models


class Pages(models.Model):# or could be episodes or something
    page_title = models.CharField(max_length=100, blank=False)
    text = models.TextField(blank=False)
    video = ''
    picture = ''

    def __str__(self):
        return self.page_title
    
class Post(models.Model):
    post_title = models.CharField(max_length=100, blank=False)
    pages = models.ManyToManyField(Pages, blank=True) # maybe blank = False

    def __str__(self):
        return self.post_title  


class Folder(models.Model):
    folder_title = models.CharField(max_length=100, blank=False)
    folder = models.ManyToManyField('self', blank=True)
    post = models.ManyToManyField(Post, blank=True)

    def __str__(self):
        return self.folder_title

