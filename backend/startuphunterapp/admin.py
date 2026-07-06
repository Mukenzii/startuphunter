from django.contrib import admin

from .models import UserProblems, Categories


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'title_ru')
    search_fields = ('title', 'title_ru')
    # title_ru auto-fills on save; leave it blank to (re)generate from the UZ title.


admin.site.register(UserProblems)