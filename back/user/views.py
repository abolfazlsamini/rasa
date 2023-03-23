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
from django.db.models import F, When, Q, Case, Count
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
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get(self, request):
        try:
            user = request.user
            posts = Post.objects.filter(user = user).values('id', 'post_title', 'created_date', 'last_modified_date','pages')
            # posts = user.posts.all().values('id', 'post_title', 'created_date', 'last_modified_date','pages')
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
            posts = Post.objects.get(id = post_id)
            # posts = user.posts.get(id = post_id)
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

    def get(self, request):
        try:
            data = request.data
            page_id = data['id']
            post_id = data['post']
            post = Post.objects.get(id=post_id)
            if post.user != request.user:
                return Response({'ERROR:': str("You are not the Author of this post")},status=400)
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
            user = request.user
            post = Post.objects.create(post_title = post_title, user=user)
            if post.user != user:
                return Response({'ERROR:': str("You are not the Author of this post")},status=400)
            # post.user.add(post.id)
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
                post = Post.objects.get(id=post_id)
                if post.user != request.user:
                    return Response({'ERROR:': str("You are not the Author of this post")},status=400)
                page = post.pages.get(id=page_id)
                page = Pages.objects.create(page_title = page_title, text = text, post = post, page = page)
                return Response(str(page.id))
            else:
                user = self.request.user
                post = Post.objects.get(id=post_id)
                if post.user != request.user:
                    return Response({'ERROR:': str("You are not the Author of this post")},status=400)
                page = Pages.objects.create(page_title = page_title, text = text, post = post)
                return Response(str(page.id))

        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# Create new Page 
# 'api/create-page/'

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
            post = Post.objects.filter(id=post_id)
            if post.user != user:
                return Response({'ERROR:': str("You are not the Author of this post")},status=400)
            post.update(post_title=post_title)
            return Response({'SUCCESS:': str(post_title)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# get id and updates the post_title 
# 'api/update-post/'

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
            post = Post.objects.get(id=post_id)
            if post.user != request.user:
                return Response({'ERROR:': str("You are not the Author of this post")},status=400)
            page = post.pages.get(id=page_id)
            parent = page.page
            page = post.pages.filter(id=page_id)
            page.update(page_title=page_title, text=text, page=parent)
            return Response({'SUCCESS:': str(page_title)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
# Updates a Page 
# 'api/update-page/'

class DeletePostView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DeletePostSerializer
    queryset = Post.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            user = self.request.user
            # data = request.data
            post_id = self.request.GET.get('postId', None)
            post = Post.objects.get(id = post_id)
            if post.user != request.user:
                return Response({'ERROR:': str("You are not the Author of this post")},status=400)
            post.delete()
            return Response({'SUCCESS:': str(post)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=400)
    def get(self, request, *args, **kwargs):
        return Response({'ERROR:': str("method Get not allowed")},status=400)
# delete a post 
# 'api/delete-post/'

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
            post = Post.objects.get(id = post_id)
            if post.user != request.user:
                return Response({'ERROR:': str("You are not the Author of this post")},status=400)
            page = post.pages.get(id=page_id)
            if not page:
                return Response({'ERROR:': 'page not found'},status=404)
            page.delete()
            return Response({'SUCCESS:': str(page.page_title)})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=402)
# delete page 
# 'api/delete-page/'

class GetFollowersCount(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = UserModel
    def get(self, request):
        try:
            return Response({'SUCCESS:': str(self.request.user.followers.all().count())})
        except Exception as e:
            return Response({'ERROR:': str(e)},status=402)
# returnst the users followers 
# 'api/user/followers-count'

class GetPostsAuthor(RetrieveAPIView):
    # permission_classes = (AllowAny,)
    queryset = Post

    def get(self, request):
        try:
            user = request.user
            post_id = self.request.GET.get('post_id', None)
            author = Post.objects.get(id = post_id).user
            author_name = Post.objects.get(id = post_id).user.username
            author_id = Post.objects.get(id = post_id).user.id
            authors_follower_count = author.followers.count()
            if(user.is_anonymous):
                res = {"author_name":author_name, "authors_follower_count":authors_follower_count, "is_followed":False, "author_id":author_id}
                return Response(res)
            
            is_followed = author.followers.filter(id = user.id).exists()
            res = {"author_name":author_name, "authors_follower_count":authors_follower_count, "is_followed":is_followed, "author_id":author_id}
            return Response((res))
        except Exception as e:
            return Response({'ERROR:': str(e)},status=402)
# GET Post_ID and returns {author_name, authors_follower_count, is_followed}
# "api/user/posts-author"

class Follow(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = UserModel

    def update(self, request):
        try:  
            user = request.user
            author_id = request.data["author_id"]
            author = UserModel.objects.get(id = author_id)
            # if author.followers.filter(id = user.id).exists():
            #     return Response({'ERROR:': str("You Are Already Following This User")},status=402)
            author.followers.add(user)
            return Response({'SUCCESS:': str("SUCCESS")}) 
        except Exception as e:
            return Response({'ERROR:': str(e)},status=402)
# PUT: Follow a user
# "api/user/follow"

class UnFollow(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = UserModel

    def update(self, request):
        try:  
            user = request.user
            author_id = request.data["author_id"]
            author = UserModel.objects.get(id = author_id)
            # if not author.followers.filter(id = user.id).exists():
            #     return Response({'ERROR:': str("You Are Not Following This User")},status=402)
            author.followers.remove(user)
            return Response({'SUCCESS:': str("SUCCESS")}) 
        except Exception as e:
            return Response({'ERROR:': str(e)},status=402)
# PUT: UnFollow a user
# "api/user/unfollow"

class GetAuthorProfile(RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = UserModel

    def get(self, request):
        try:
            user = request.user
            author_id = self.request.GET.get('author_id', None)
            author = UserModel.objects.get(id = author_id)
            author_name = author.username
            authors_follower_count = author.followers.count()
            posts = Post.objects.filter(user = author).values('id', 'post_title', 'created_date', 'last_modified_date','pages')
            data = list(posts)
            the_list = []
            data_list = []
            for i in range(len(data)):
                if data[i]['id'] not in the_list:
                    the_list.append(data[i]['id'])
                    data_list.append(data[i])
            if(user.is_anonymous):
                res = {"author_name":author_name, "authors_follower_count":authors_follower_count, "is_followed":False, "posts":data_list}
                return Response(res, status=200)
            
            is_followed = author.followers.filter(id = user.id).exists()
            res = {"author_name":author_name, "authors_follower_count":authors_follower_count, "is_followed":is_followed, "posts":data_list}
            return Response(res, status=200)
        except Exception as e:
            return Response({'ERROR:': str(e)},status=402)
# GET: author profille with author id
# 'api/user/author/'