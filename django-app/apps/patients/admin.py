from apps.patients.models import Address, Patient
from django.contrib import admin


class AddressAdmin(admin.ModelAdmin):
    list_display = (
        "street",
        "number",
        "floor",
        "city",
        "province",
        "country",
        "postal_code",
        "created_date",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    search_fields = (
        "id",
        "street",
        "number",
        "city",
        "province",
        "country",
        "postal_code",
    )
    list_filter = ("province", "country")
    ordering = ("-created_date",)


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
admin.site.register(Address, AddressAdmin)
