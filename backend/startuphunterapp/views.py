from .models import Categories, UserProblems
from .serializers import CategorySerializer, UserProblemSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response


class CategoryList(generics.ListAPIView):

    queryset = Categories.objects.all()

    serializer_class = CategorySerializer



@api_view(["GET"])

def get_categories(request):

    categories = Categories.objects.all()

    serializers = CategorySerializer(categories, many=True)

    category_name = ['All'] + [cat['name'] for cat in serializers.data]

    return Response(category_name)


@api_view(["GET"])
def get_problems_by_category(request, category_name):

    if category_name == "All":
        problems = UserProblems.objects.all()
    else:
        problems = UserProblems.objects.filter(category__title=category_name)

    serializer = UserProblemSerializer(problems, many=True)
    return Response(serializer.data)


