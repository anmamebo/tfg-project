from django.contrib import admin

from apps.departments.models import Department, Room


admin.site.register(Department)
admin.site.register(Room)
