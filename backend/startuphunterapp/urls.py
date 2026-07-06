from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


from .views import CategoryList, get_problems_by_category, UserProblemCreate
from .views import get_problem_by_id, google_auth
from .views import presence_heartbeat, presence_online


urlpatterns = [
    path("categories/", CategoryList.as_view()),
    path('problems/category/<str:category_name>/', get_problems_by_category),
    path('problems/', UserProblemCreate.as_view()),
    path('problems/<int:pk>/', get_problem_by_id),
    path('auth/google/', google_auth),
    path('presence/heartbeat/', presence_heartbeat),
    path('presence/online/', presence_online),

]

urlpatterns = format_suffix_patterns(urlpatterns)
