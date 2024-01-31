import os
import uuid

from apps.base.models import BaseModel
from django.core.validators import FileExtensionValidator
from django.db import models

ALLOWED_EXTENSIONS = [
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "svg",
    "txt",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "mp4",
    "mp3",
    "mov",
    "wav",
]


def medicaltest_directory_path(instance, filename):
    return os.path.join(
        "medicaltest_attachments", str(instance.medical_test.id), filename
    )


class MedicalTest(BaseModel):
    name = models.CharField(
        verbose_name="Nombre de la prueba",
        max_length=255,
    )
    description = models.TextField(verbose_name="Descripción", blank=True, null=True)
    date_prescribed = models.DateTimeField(
        verbose_name="Fecha de Prescripción", auto_now_add=True
    )
    result = models.TextField(verbose_name="Resultado", blank=True, null=True)
    is_completed = models.BooleanField(verbose_name="¿Completado?", default=False)

    doctor = models.ForeignKey(
        "doctors.Doctor", on_delete=models.CASCADE, verbose_name="Médico"
    )
    patient = models.ForeignKey(
        "patients.Patient", on_delete=models.CASCADE, verbose_name="Paciente"
    )
    appointment = models.ForeignKey(
        "appointments.Appointment",
        on_delete=models.CASCADE,
        verbose_name="Cita",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Prueba Médica"
        verbose_name_plural = "Pruebas Médicas"

    def __str__(self):
        return f"{self.name} - {self.date_prescribed.strftime('%d/%m/%Y')} - {self.patient}"


class MedicalTestAttachment(BaseModel):
    medical_test = models.ForeignKey(
        MedicalTest,
        on_delete=models.CASCADE,
        related_name="attachments",
        verbose_name="Prueba Médica",
    )
    file = models.FileField(
        verbose_name="Archivo Adjunto",
        upload_to=medicaltest_directory_path,
        validators=[FileExtensionValidator(allowed_extensions=ALLOWED_EXTENSIONS)],
    )
    name = models.CharField(
        verbose_name="Nombre del archivo",
        max_length=255,
    )
    description = models.TextField(verbose_name="Descripción", blank=True, null=True)
    extension = models.CharField(
        verbose_name="Extensión del fichero",
        max_length=10,
        blank=True,
        null=True,
        editable=False,
    )

    def save(self, *args, **kwargs):
        _, extension = os.path.splitext(self.file.name)
        self.extension = extension[1:] if extension else None

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Archivo Adjunto"
        verbose_name_plural = "Archivos Adjuntos"

    def __str__(self):
        return f"{self.medical_test} - {self.file.name}"
