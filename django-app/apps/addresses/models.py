from apps.base.models import BaseModel
from django.db import models


class Address(BaseModel):
    street = models.CharField(verbose_name="Calle", max_length=255)
    number = models.IntegerField(verbose_name="Número")
    floor = models.CharField(verbose_name="Piso", max_length=10, blank=True, null=True)
    city = models.CharField(verbose_name="Ciudad", max_length=255)
    province = models.CharField(verbose_name="Provincia", max_length=255)
    country = models.CharField(verbose_name="País", max_length=255)
    postal_code = models.CharField(verbose_name="Código postal", max_length=10)

    class Meta:
        verbose_name = "Dirección"
        verbose_name_plural = "Direcciones"
        default_permissions = ()
        permissions = [
            ("list_address", "Can list address"),
            ("get_address", "Can get address"),
            ("add_address", "Can add address"),
            ("change_address", "Can change address"),
            ("delete_address", "Can delete address"),
        ]

    def __str__(self):
        return f"{self.street} {self.number} {self.floor} - {self.city} ({self.province}) - {self.country} - {self.postal_code}"
