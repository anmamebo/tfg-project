from apps.medicalspecialties.models import MedicalSpecialty
from django.contrib import admin


# Register your models here.
class MedicalSpecialtyAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_date",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    search_fields = ("name", "description")
    list_filter = ("state",)
    ordering = ("-created_date",)


admin.site.register(MedicalSpecialty, MedicalSpecialtyAdmin)
