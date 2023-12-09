from django.contrib import admin

from apps.schedules.models import Schedule


class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        "end_time",
        "start_time",
        "doctor",
    )
    readonly_fields = (
        "id",
        "created_date",
        "modified_date",
    )
    search_fields = (
        "doctor__user__name",
        "doctor__user__last_name",
        "doctor__user__username",
        "doctor__user__email",
    )
    list_filter = ("day_of_week",)
    ordering = ("-created_date",)


admin.site.register(Schedule, ScheduleAdmin)
