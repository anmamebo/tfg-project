from apps.base.models import BaseModel
from django.db import models


class MedicalSpecialty(BaseModel):
    name = models.CharField(verbose_name="Nombre", max_length=50, unique=True)
    description = models.TextField(
        verbose_name="Descripción", max_length=255, blank=True, null=True
    )

    class Meta:
        verbose_name = "Especialidad médica"
        verbose_name_plural = "Especialidades médicas"

    def __str__(self):
        return self.name
