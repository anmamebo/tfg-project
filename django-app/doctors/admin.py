from django.contrib import admin

from doctors.models import Doctor, MedicalSpecialty


admin.site.register(Doctor)
admin.site.register(MedicalSpecialty)