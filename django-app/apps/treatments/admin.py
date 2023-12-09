from django.contrib import admin

from apps.treatments.models import Treatment


class TreatmentAdmin(admin.ModelAdmin):
    list_display = (
        "status",
        "description",
        "patient",
        "duration",
        "start_date",
        "created_date",
    )
    readonly_fields = ("id", "created_date", "modified_date")
    list_display_links = ("description",)
    search_fields = ("description",)
    list_filter = ("status",)
    ordering = ("-created_date",)


admin.site.register(Treatment, TreatmentAdmin)
