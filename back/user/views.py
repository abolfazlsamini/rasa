from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post
from .serializers import UserRegisterSerializer, GetUserPostsSerializer
from .models import UserModel
from rest_framework_simplejwt.tokens import RefreshToken


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
    }) 
    # user get token after registering



class GetUserPostsVIew(ListAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = GetUserPostsSerializer
    queryset = UserModel.objects.all()
    
    def get(self, request, *args, **kwargs):
        try:
            user = self.request.user
            users_post = user.posts.first()
            users_page = users_post.pages.all()
            return Response(str(users_page))
        except Exception as e:
            return Response({"Error": str(e)})
class SubmitNewPostView(CreateAPIView):
    pass
    #serializer_class = SubmitNewPostSerializer
