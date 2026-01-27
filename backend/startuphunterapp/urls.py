from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


from .views import CategoryList, get_problems_by_category, UserProblemCreate
from .views import get_problem_by_id


urlpatterns = [
    path("categories/", CategoryList.as_view()),
    path('problems/category/<str:category_name>/', get_problems_by_category),
    path('problems/', UserProblemCreate.as_view()),
    path('problems/<int:pk>/', get_problem_by_id),

]

urlpatterns = format_suffix_patterns(urlpatterns)
