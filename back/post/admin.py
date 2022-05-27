from django.contrib import admin
from .models import Chapter, Pages, Post


admin.site.register(Post)
admin.site.register(Pages)
admin.site.register(Chapter)
