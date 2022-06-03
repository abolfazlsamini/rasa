from django.db import models


class Post(models.Model):
    post_title = models.CharField(max_length=100, blank=False)
    created_date = models.DateTimeField(auto_now=True)
    last_modified_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post_title
    

class Pages(models.Model):
    page_title = models.CharField(max_length=100, blank=False)
    text = models.TextField(blank=False)
    page = models.ForeignKey('self', on_delete=models.CASCADE, default=None,blank=True, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='pages')
    video = ''
    picture = ''

    def __str__(self):
        return self.page_title