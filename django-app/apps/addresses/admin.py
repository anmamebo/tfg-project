from apps.addresses.models import Address
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


admin.site.register(Address, AddressAdmin)
