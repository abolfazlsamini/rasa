from rest_framework import serializers
from rest_framework.response import Response
from .models import Pages, Post, UserModel



class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        
        user = UserModel.objects.create_user(validated_data['username'], None,validated_data['password'])
        return user


class GetUserPostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('posts',)
        
class PageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pages
        fields = ('id', 'page_title')


class PostSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'post_title', 'pages')



