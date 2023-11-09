from django.contrib import admin

from patients.models import Patient, Address


admin.site.register(Patient)
admin.site.register(Address)
