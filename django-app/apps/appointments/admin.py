from apps.appointments.models import Appointment
from django.contrib import admin


class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "status",
        "type",
        "reason",
        "request_date",
        "patient",
        "doctor",
        "room",
    )
    readonly_fields = (
        "id",
        "request_date",
    )
    search_fields = (
        "status",
        "type",
        "reason",
        "patient__user__name",
        "patient__user__last_name",
        "doctor__user__name",
        "doctor__user__last_name",
    )
    list_filter = ("status", "type")
    ordering = ("-request_date",)


admin.site.register(Appointment, AppointmentAdmin)
