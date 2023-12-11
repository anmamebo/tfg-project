from apps.users.models import User
from django.contrib import admin


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "username",
        "name",
        "last_name",
        "is_active",
    )
    readonly_fields = ("id",)
    search_fields = (
        "email",
        "username",
        "name",
        "last_name",
    )
    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
    )
    list_per_page = 10


admin.site.register(User, UserAdmin)
