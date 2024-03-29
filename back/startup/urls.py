from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from post.views import GetPostView
from user.views import (
UserRegisterView,
GetUserPostsVIew,
GetUserPageView, 
CreatePostView,
CreatePageView,
UpdatePostView,
UpdatePageVIew,
DeletePostView,
DeletePageView,
GetUserSinglePostsVIew,
GetUserSinglePageVIew,
GetUserSinglePostsFullVIew,
GetFollowersCount,
GetPostsAuthor,
Follow,
UnFollow,
GetAuthorProfile,
SearchInUsers,
SearchInPosts,
Test
)

urlpatterns = [
    path('admin/', admin.site.urls),
    #GET: get posts:
    path('api/posts/',GetPostView.as_view(), name='posts'),
    path('api/pages/',GetUserPageView.as_view(), name='pages'),

    path('api/single-post/',GetUserSinglePostsVIew.as_view(), name='singlepost'),
    path('api/single-post-full/',GetUserSinglePostsFullVIew.as_view(), name='singlepostfull'),
    path('api/single-page/',GetUserSinglePageVIew.as_view(), name='singlepage'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='verify_token'),
    #POST: User Register:
    path('api/register/', UserRegisterView.as_view(), name='user_register'),
    #GET: GET user POSTS and PAGES:
    path('api/get-posts/', GetUserPostsVIew.as_view(), name='get_posts'),
    #POST: CREATE a POST:
    path('api/create-post/', CreatePostView.as_view(), name='create_post'),
    #POST: CREATE a PAGE:
    path('api/create-page/', CreatePageView.as_view(), name='create_page'),
    #PATCH: update post title:
    path('api/update-post/', UpdatePostView.as_view(), name='update-post'),
    #PATCH: update page:
    path('api/update-page/', UpdatePageVIew.as_view(), name='update-page'),
    #DELETE: delete post:
    path('api/delete-post/', DeletePostView.as_view(), name='delete-post'),
    #DELETE: delete page:
    path('api/delete-page/', DeletePageView.as_view(), name='delete-page'),


    path('api/user/followers-count', GetFollowersCount.as_view(), name='followers-count'),
    path('api/user/posts-author', GetPostsAuthor.as_view(), name='get-post-author'),
    path('api/user/follow/', Follow.as_view(), name='Follow'),
    path('api/user/unfollow/', UnFollow.as_view(), name='UnFollow'),
    path('api/user/author', GetAuthorProfile.as_view(), name='GetAuthorProfile'),



    path('api/user', SearchInUsers.as_view(), name='SearchInUsers'),
    path('api/post', SearchInPosts.as_view(), name='SearchInPosts'),# TODO change this url
    


    path('api/test', Test.as_view(), name='Test'),# TODO change this url
]
