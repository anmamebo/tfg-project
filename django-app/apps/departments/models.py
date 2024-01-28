from apps.base.models import BaseModel
from django.db import models


class Department(BaseModel):
    name = models.CharField(verbose_name="Nombre", max_length=50, unique=True)
    description = models.TextField(
        verbose_name="Descripción", max_length=255, blank=True, null=True
    )

    class Meta:
        verbose_name = "Departamento"
        verbose_name_plural = "Departamentos"
        default_permissions = ()
        permissions = [
            ("list_department", "Can list department"),
            ("get_department", "Can get department"),
            ("add_department", "Can add department"),
            ("change_department", "Can change department"),
            ("delete_department", "Can delete department"),
        ]

    def __str__(self):
        return self.name
