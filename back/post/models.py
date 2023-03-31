from django.db import models
from user.models import UserModel
# class FirstPageManager(models.Manager):
#     def getFirstPage(self):
#         return self.get_queryset().all()
        
class Post(models.Model):
    post_title = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now=True)
    last_modified_date = models.DateTimeField(auto_now_add=True)
    up_vote = models.IntegerField(default=0)
    down_vote = models.IntegerField(default=0)
    user = models.ForeignKey(UserModel, related_name='user', on_delete=models.DO_NOTHING)
    # objects = models.Manager()
    # first_page = FirstPageManager()

    # def firstPage(self):
    #     return self.pages.all().first().id

    def __str__(self):
        return self.post_title
    
    def upVotes(self):
        return self.up_vote - self.down_vote
    

class Pages(models.Model):
    page_title = models.CharField(max_length=100)
    text = models.TextField(blank=False)
    page = models.ForeignKey('self', on_delete=models.CASCADE, default=None,blank=True, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='pages')
    video = ''
    picture = ''

    def __str__(self):
        return self.page_title


class TagsTypes(models.Model):
    tag_title = models.CharField(max_length=100)

    def __str__(self):
        return self.tag_title
    
class Tags(models.Model):
    tags_Types = models.ForeignKey('TagsTypes', on_delete=models.CASCADE)
    post = models.ManyToManyField("Post", verbose_name=("post"))

    def __str__(self):
        return self.tags_Types.tag_title
    