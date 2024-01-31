from apps.medicaltests.models import MedicalTest, MedicalTestAttachment
from django.contrib import admin


class MedicalTestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "patient",
        "doctor",
        "appointment",
        "date_prescribed",
        "is_completed",
    )
    readonly_fields = (
        "id",
        "date_prescribed",
        "created_date",
        "modified_date",
    )
    search_fields = (
        "id",
        "name",
        "description",
        "result",
        "patient__user__name",
        "patient__user__last_name",
        "patient__user__username",
        "patient__user__email",
        "doctor__user__name",
        "doctor__user__last_name",
        "doctor__user__username",
        "doctor__user__email",
    )
    list_filter = ("is_completed", "state")
    ordering = ("-created_date",)


class MedicalTestAttachmentAdmin(admin.ModelAdmin):
    list_display = (
        "medical_test",
        "file",
        "name",
    )
    readonly_fields = ("id", "extension", "created_date", "modified_date")
    search_fields = (
        "id",
        "medical_test__name",
        "name",
    )
    list_filter = ("state",)
    ordering = ("-created_date",)


admin.site.register(MedicalTest, MedicalTestAdmin)
admin.site.register(MedicalTestAttachment, MedicalTestAttachmentAdmin)
