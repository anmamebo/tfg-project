from apps.schedules.models import Schedule
from django.contrib import admin


class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        "start_time",
        "end_time",
        "doctor",
    )
    readonly_fields = (
        "id",
        "created_date",
        "modified_date",
    )
    search_fields = (
        "id",
        "doctor__user__name",
        "doctor__user__last_name",
        "doctor__user__username",
        "doctor__user__email",
    )
    list_filter = ("day_of_week",)
    ordering = ("-created_date",)


admin.site.register(Schedule, ScheduleAdmin)
