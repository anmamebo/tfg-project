from apps.addresses.models import Address
from apps.base.models import BaseModel
from apps.users.models import User
from django.db import models


class Patient(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Usuario")
    dni = models.CharField(verbose_name="DNI", max_length=9, unique=True)
    birthdate = models.DateField(
        verbose_name="Fecha de nacimiento", blank=True, null=True
    )
    gender = models.CharField(
        verbose_name="Género",
        max_length=1,
        choices=(
            ("M", "Masculino"),
            ("F", "Femenino"),
        ),
    )
    phone = models.CharField(
        verbose_name="Teléfono", max_length=20, blank=True, null=True
    )
    social_security = models.CharField(
        verbose_name="Número de seguridad social",
        max_length=12,
        unique=True,
        blank=True,
        null=True,
    )
    address = models.OneToOneField(
        Address,
        on_delete=models.CASCADE,
        verbose_name="Dirección",
        blank=True,
        null=True,
    )
    nationality = models.CharField(
        verbose_name="Nacionalidad", max_length=255, blank=True, null=True
    )

    class Meta:
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"

    def __str__(self):
        return f"{self.user.name} {self.user.last_name} ({self.user.username}) - {self.user.email}"
