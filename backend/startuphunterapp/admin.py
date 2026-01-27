from django.contrib import admin

from .models import UserProblems, Categories

admin.site.register(UserProblems)
admin.site.register(Categories)