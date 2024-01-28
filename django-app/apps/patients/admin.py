from apps.patients.models import Patient
from django.contrib import admin


class PatientAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "dni",
        "birthdate",
        "gender",
        "phone",
        "social_security",
        "created_date",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    search_fields = (
        "id",
        "user__name",
        "user__last_name",
        "user__username",
        "user__email",
        "dni",
        "social_security",
        "phone",
    )
    list_filter = ("state",)
    ordering = ("-created_date",)


admin.site.register(Patient, PatientAdmin)
