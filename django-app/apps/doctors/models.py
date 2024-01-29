from apps.base.models import BaseModel
from apps.medicalspecialties.models import MedicalSpecialty
from apps.users.models import User
from django.db import models


class Doctor(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Usuario")
    collegiate_number = models.CharField(
        verbose_name="Número de colegiado", max_length=10, unique=True
    )
    is_available = models.BooleanField(verbose_name="Disponible", default=True)
    departments = models.ManyToManyField(
        "departments.Department", verbose_name="Departamentos", blank=True
    )
    medical_specialties = models.ManyToManyField(
        MedicalSpecialty, verbose_name="Especialidades médicas", blank=True
    )

    class Meta:
        verbose_name = "Médico"
        verbose_name_plural = "Médicos"

    def __str__(self):
        return f"{self.user.name} {self.user.last_name} ({self.user.username}) - {self.user.email}"
