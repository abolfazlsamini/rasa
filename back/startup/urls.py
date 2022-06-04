from user.views import UserRegisterView, GetUserPostsVIew, CreatePostView, CreatePageView
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #POST: User Register:
    path('api/register/', UserRegisterView.as_view(), name='user_register'),
    #GET: GET user POSTS and PAGES:
    path('api/get-posts/', GetUserPostsVIew.as_view(), name='get_posts'),
    #POST: CREATE a POST:
    path('api/create-post/', CreatePostView.as_view(), name='create_post'),
    #POST: CREATE a PAGE:
    path('api/create-page/', CreatePageView.as_view(), name='create_page'),

]
