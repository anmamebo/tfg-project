from apps.base.models import BaseModel
from apps.departments.models import Department
from django.db import models


class Room(BaseModel):
    name = models.CharField(verbose_name="Nombre", max_length=50, unique=True)
    description = models.TextField(
        verbose_name="Descripción", max_length=255, blank=True, null=True
    )
    type = models.CharField(verbose_name="Tipo", max_length=50, blank=True, null=True)
    location = models.CharField(
        verbose_name="Ubicación",
        max_length=50,
    )
    capacity = models.IntegerField(verbose_name="Capacidad", blank=True, null=True)
    is_available = models.BooleanField(verbose_name="Disponible", default=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        verbose_name="Departamento",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Sala"
        verbose_name_plural = "Salas"

    def __str__(self):
        if self.department is None:
            return self.name + " (" + self.location + ")"
        return self.name + " (" + self.location + ") - " + self.department.name
