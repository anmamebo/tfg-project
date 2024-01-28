from apps.departments.models import Department, Room
from django.contrib import admin


class DepartmentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_date",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    search_fields = ("id", "name", "description")
    ordering = ("-created_date",)


class RoomAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "type",
        "location",
        "capacity",
        "is_available",
        "department",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    search_fields = ("id", "name", "description", "type", "location", "capacity")
    list_filter = ("is_available", "department")
    ordering = ("-created_date",)


admin.site.register(Department, DepartmentAdmin)
admin.site.register(Room, RoomAdmin)
