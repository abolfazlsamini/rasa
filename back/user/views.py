from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserModel
from post.models import Post, Pages
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
UserRegisterSerializer, 
PageDetailSerializer, 
PostSerializer, 
CreatePostSerializer, 
CreatePageSerializer, 
UpdatePostSerializer, 
UpdatePagesSerializer, 
DeletePostSerializer,
DeletePageSeriallizer
)


class UserRegisterView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer
    queryset = UserModel.objects.all()
#TODO: make it so that noone could sighup with ... username or something
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    },status=200) 
# user will get a token after registering

class GetUserPostsVIew(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    # def get(self, request):
    #     try:
    #         user = self.request.user
    #         posts = user.posts.all().values('id', 'post_title', 'created_date', 'last_modified_date')
    #         return JsonResponse(list(posts), safe=False)
    #     except Exception as e:
    #         return Response({'ERROR:': str(e)})
# GET user POSTS and PAGES

class GetUserPageView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PageDetailSerializer
    queryset = Post.objects.all()

    def get(self, request, *arg, **kwargs):
        try:
            data = request.data
            page_id = data['id']
            post_id = data['post']
            user = self.request.user
            post = user.posts.get(id=post_id)
            page = post.pages.get(id=page_id)
            return Response({'page_title':str(page.page_title),'text':str(page.text)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
class CreatePostView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CreatePostSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            data=request.data
            post_title = data['post_title']
            user = self.request.user
            post = Post.objects.create(post_title = post_title)
            user.posts.add(post.id)
            return Response({'SUCCESS:': str(post.id)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# Create new Post

class CreatePageView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CreatePageSerializer

    def create(self, request, *args, **kwargs):
        try:
            data=request.data
            page_title = data['page_title']
            text = data['text']
            post_id = data['post']
            page_id = data['page']
            if page_id != "0":# is there a better way to do this? it check if a page should be under other pages
                user = self.request.user
                post = user.posts.get(id=post_id)
                page = post.pages.get(id=page_id)
                page = Pages.objects.create(page_title = page_title, text = text, post = post, page = page)
                return Response(str(page.id))
            else:
                user = self.request.user
                post = user.posts.get(id=post_id)
                page = Pages.objects.create(page_title = page_title, text = text, post = post)
                return Response(str(page.id))

        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# Create new Page

class UpdatePostView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdatePostSerializer
    queryset = Post.objects.all()

    def update(self, request, *args, **kwargs):
        try:
            user = self.request.user
            data = request.data
            post_id = data['id']
            post_title = data['post_title']
            post = user.posts.filter(id=post_id)
            post.update(post_title=post_title)
            return Response({'SUCCESS:': str(post_title)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# get id and updates the post_title

class UpdatePageVIew(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdatePagesSerializer
    queryset = Pages.objects.all()

    def update(self, request, *args, **kwargs):
        try:
            data = request.data
            post_id = data['post_id']
            page_id = data['page_id']
            page_title = data['page_title']
            text = data['text']
            user = self.request.user
            post = user.posts.get(id=post_id)
            page = post.pages.get(id=page_id)
            parent = page.page
            page = post.pages.filter(id=page_id)
            page.update(page_title=page_title, text=text, page=parent)
            return Response({'SUCCESS:': str(page_title)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# Updates a Page

class DeletePostView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DeletePostSerializer

    def delete(self, request, *args, **kwargs):
        try:
            user = self.request.user
            data = request.data
            post_id = data['post_id']
            post = user.posts.get(id = post_id)
            post.delete()
            return Response({'SUCCESS:': str(post)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# delete a post

class DeletePageView(DestroyAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = DeletePageSeriallizer
    queryset = Pages.objects.all()
    def delete(self, request, *args, **kwargs):
        try:
            user = self.request.user
            data = request.data
            page_id = data['page_id']
            post_id = data['post_id']
            post = user.posts.get(id = post_id)
            page = post.pages.get(id=page_id)
            if not page:
                return Response({'ERROR:': 'page not found'},status=404)
            page.delete()
            return Response({'SUCCESS:': str(page.page_title)})
        except Exception as e:
            print(str(e))
            return Response({'ERROR:': str(e)},status=402)
# delete page

