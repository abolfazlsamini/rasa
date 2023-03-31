from django.contrib import admin
from .models import Pages, Post, Tags, TagsTypes


admin.site.register(Post)
admin.site.register(Pages)
admin.site.register(Tags)
admin.site.register(TagsTypes)

