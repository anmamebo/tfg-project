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
        default_permissions = ()
        permissions = [
            ("list_medicalspecialty", "Can list medicalspecialty"),
            ("get_medicalspecialty", "Can get medicalspecialty"),
            ("add_medicalspecialty", "Can add medicalspecialty"),
            ("change_medicalspecialty", "Can change medicalspecialty"),
            ("delete_medicalspecialty", "Can delete medicalspecialty"),
        ]

    def __str__(self):
        return self.name
