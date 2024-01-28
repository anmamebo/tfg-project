from apps.doctors.models import Doctor
from apps.medicalspecialties.models import MedicalSpecialty
from django.contrib import admin


class MedicalSpecialtyFilter(admin.SimpleListFilter):
    title = "Especialidad médica"
    parameter_name = "medical_specialty"

    def lookups(self, request, model_admin):
        medical_specialties = MedicalSpecialty.objects.all()
        return [(ms.id, ms.name) for ms in medical_specialties]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(medical_specialties__id=self.value())


class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "collegiate_number",
        "doctor_medical_specialties",
        "is_available",
        "created_date",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    search_fields = (
        "id",
        "user__name",
        "user__last_name",
        "user__username",
        "user__email",
        "collegiate_number",
    )
    list_filter = ("is_available", MedicalSpecialtyFilter)
    ordering = ("-created_date",)

    def doctor_medical_specialties(self, obj):
        return ", ".join(
            [ms.name for ms in obj.medical_specialties.all().order_by("name")]
        )


admin.site.register(Doctor, DoctorAdmin)
