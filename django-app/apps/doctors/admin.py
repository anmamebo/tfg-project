from django.contrib import admin

from apps.doctors.models import Doctor, MedicalSpecialty


admin.site.register(Doctor)
admin.site.register(MedicalSpecialty)
