from .models import Categories, UserProblems
from .serializers import CategorySerializer, UserProblemSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from django.shortcuts import get_object_or_404


class CategoryList(generics.ListAPIView):

    queryset = Categories.objects.filter()

    serializer_class = CategorySerializer



@api_view(["GET"])

def get_categories(request):

    categories = Categories.objects.all()

    serializers = CategorySerializer(categories, many=True)

    category_name = ['All'] + [cat['name'] for cat in serializers.data]

    return Response(category_name)


class UserProblemCreate(generics.CreateAPIView):
    queryset = UserProblems.objects.all()
    serializer_class = UserProblemSerializer


@api_view(["GET"])
def get_problems_by_category(request, category_name):
    if category_name == "All":
        problems = UserProblems.objects.filter(published=True)

    else:
        problems = UserProblems.objects.filter(category__title=category_name, published=True)

    serializer = UserProblemSerializer(problems, many=True)
    return Response(serializer.data)


@api_view(["GET"]) 
def get_problem_by_id(request, pk):
    problem = get_object_or_404(UserProblems, pk=pk)
    serializer = UserProblemSerializer(problem)
    return Response(serializer.data, status=status.HTTP_200_OK)


