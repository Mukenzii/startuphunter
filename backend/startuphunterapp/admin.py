from datetime import timedelta

from django.contrib import admin
from django.utils import timezone

from .models import UserProblems, Categories, ActiveVisitor, ONLINE_WINDOW_SECONDS


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'title_ru')
    search_fields = ('title', 'title_ru')
    # title_ru auto-fills on save; leave it blank to (re)generate from the UZ title.


@admin.register(ActiveVisitor)
class ActiveVisitorAdmin(admin.ModelAdmin):
    list_display = ('client_id', 'last_seen', 'is_online')
    readonly_fields = ('client_id', 'last_seen')

    @admin.display(boolean=True, description='Online now')
    def is_online(self, obj):
        return (timezone.now() - obj.last_seen) <= timedelta(seconds=ONLINE_WINDOW_SECONDS)

    def has_add_permission(self, request):
        # Rows are created by the heartbeat endpoint, not by hand.
        return False


admin.site.register(UserProblems)