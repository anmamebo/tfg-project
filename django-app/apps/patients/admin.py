from django.contrib import admin

from apps.patients.models import Patient, Address


admin.site.register(Patient)
admin.site.register(Address)
