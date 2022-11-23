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
DeletePageSeriallizer,
SinglePostSerializer,
SinglePageSerializer
)
from django.db.models import F, When, Q, Case
from django.db.models.functions import Coalesce, FirstValue

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

    def get(self, request):
        try:
            user = self.request.user
            posts = user.posts.all().values('id', 'post_title', 'created_date', 'last_modified_date','pages')
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

# GET user POSTS and PAGES

class GetUserSinglePostsVIew(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SinglePostSerializer
    queryset = Post.objects.all()

    def get(self, request):
        try:
            # user = self.request.user
            # data = request.data
            post_id = self.request.GET.get('id', None)
            posts = Post.objects.get(id = post_id)
            pages = posts.pages.all().values('id', 'page_title','post')
            return JsonResponse(list(pages), safe=False)
        except Exception as e:
            print(str(e))
            return Response({'ERROR:': str(e)}, status=404)
# POST: GET user's specific POST with related Pages

class GetUserSinglePageVIew(ListAPIView):
    permission_classes = (AllowAny,)
    # serializer_class = SinglePageSerializer
    queryset = Post.objects.all()

    def get(self, request):
        try:
            # user = self.request.user
            page_id = self.request.GET.get('pageId', None)
            post_id = self.request.GET.get('postId', None)
            post = Post.objects.get(id = post_id)
            page = post.pages.filter(id = page_id).values('id', 'page_title','page','text')
            # pages = post.pages.all().values('id', 'page_title','text')
            return JsonResponse(list(page), safe=False)
        except Exception as e:
            print(str(e))
            return Response({'ERROR:': str(e)}, status=404)
# POST: GET user's specific POST with related Pages

class GetUserSinglePostsFullVIew(ListAPIView):
    permission_classes = (AllowAny,)
    # serializer_class = SinglePostSerializer
    queryset = Post.objects.all()

    def get(self, request):
        try:
            user = self.request.user
            # data = request.data
            post_id = self.request.GET.get('id', None)
            posts = user.posts.get(id = post_id)
            pages = posts.pages.all().values('id', 'page_title','page','text')
            return JsonResponse(list(pages), safe=False)
        except Exception as e:
            print(str(e))
            return Response({'ERROR:': str(e)}, status=404)
# POST: GET user's specific POST with related Pages


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

class DeletePostView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DeletePostSerializer
    queryset = Post.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            user = self.request.user
            # data = request.data
            post_id = self.request.GET.get('postId', None)
            post = user.posts.get(id = post_id)
            post.delete()
            return Response({'SUCCESS:': str(post)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
    def get(self, request, *args, **kwargs):
        return Response({'ERROR:': str("method Get not allowed")},status=400)

# delete a post

class DeletePageView(DestroyAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = DeletePageSeriallizer
    queryset = Pages.objects.all()
    def delete(self, request, *args, **kwargs):
        try:
            user = self.request.user
            # data = request.data
            page_id = self.request.GET.get('page_id', None)
            post_id = self.request.GET.get('post_id', None)
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

