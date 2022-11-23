from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Post, Pages
from .serializers import (
    GetPostSerializer
    )

class GetPostView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GetPostSerializer
    queryset = Post.objects.all()

    def get(self, request):
        try:
            posts = Post.objects.all().values('id', 'post_title', 'created_date', 'last_modified_date','pages')
            data = list(posts)
            the_list = []
            data_list = []
            for i in range(len(data)):
                if data[i]['id'] not in the_list:
                    the_list.append(data[i]['id'])
                    data_list.append(data[i])

            return JsonResponse(list(data_list), safe=False)
        except Exception as e:
            return Response({'ERROR:': str(e)})