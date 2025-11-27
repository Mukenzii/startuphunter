from rest_framework import serializers

from .models import Categories, UserProblems


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class UserProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProblems
        fields = '__all__'
