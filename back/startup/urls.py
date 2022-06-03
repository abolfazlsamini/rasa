from user.views import UserRegisterView, GetUserPostsVIew
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # User Register:
    path('api/register/', UserRegisterView.as_view(), name='user_register'),
    # GET user POSTS and PAGES:
    path('api/get-posts/', GetUserPostsVIew.as_view(), name='get_posts'),

]
