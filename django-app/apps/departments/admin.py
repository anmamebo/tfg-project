from apps.departments.models import Department
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


admin.site.register(Department, DepartmentAdmin)
