from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


from .views import CategoryList, get_problems_by_category


urlpatterns = [
    path("categories/", CategoryList.as_view()),
    path('problems/category/<str:category_name>/', get_problems_by_category),

]

urlpatterns = format_suffix_patterns(urlpatterns)