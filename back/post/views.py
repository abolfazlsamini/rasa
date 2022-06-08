from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Pages
from .serializers import (
    GetPostSerializer
    )

class GetPostView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GetPostSerializer
    queryset = Post.objects.all()