import uuid

from django.db import models


# Create your models here.
class BaseModel(models.Model):
    """Model definition for BaseModel."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    state = models.BooleanField(verbose_name="Estado", default=True)
    created_date = models.DateTimeField(
        verbose_name="Fecha de Creación", auto_now=False, auto_now_add=True
    )
    modified_date = models.DateTimeField(
        verbose_name="Fecha de Modificación", auto_now=True, auto_now_add=False
    )
    deleted_date = models.DateTimeField(
        verbose_name="Fecha de Eliminación", auto_now=True, auto_now_add=False
    )

    class Meta:
        abstract = True
        verbose_name = "Modelo Base"
        verbose_name_plural = "Modelos Base"
