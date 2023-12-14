from apps.base.models import BaseModel
from apps.users.models import User
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
        default_permissions = ()
        permissions = [
            ("list_patient", "Can list patient"),
            ("get_patient", "Can get patient"),
            ("add_patient", "Can add patient"),
            ("change_patient", "Can change patient"),
            ("delete_patient", "Can delete patient"),
        ]

    def __str__(self):
        return f"{self.user.name} {self.user.last_name} ({self.user.username}) - {self.user.email}"
