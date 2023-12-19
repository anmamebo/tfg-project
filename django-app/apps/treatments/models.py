from apps.base.models import BaseModel
from django.db import models


class Treatment(BaseModel):
    status = [
        ("in_progress", "En progreso"),
        ("completed", "Completado"),
        ("interrupted", "Interrumpido"),
        ("cancelled", "Cancelado"),
    ]

    status = models.CharField(
        verbose_name="Estado", max_length=50, choices=status, default="in_progress"
    )
    description = models.TextField(verbose_name="Descripción", max_length=255)
    duration = models.CharField(verbose_name="Duración", max_length=50)
    start_date = models.DateTimeField(verbose_name="Fecha de inicio")
    end_date = models.DateTimeField(
        verbose_name="Fecha de finalización", blank=True, null=True
    )
    comments = models.TextField(
        verbose_name="Comentarios", max_length=255, blank=True, null=True
    )
    application_frequency = models.CharField(
        verbose_name="Frecuencia de aplicación", max_length=50, blank=True, null=True
    )
    recommended_dosage = models.CharField(
        verbose_name="Dosis recomendada", max_length=50, blank=True, null=True
    )
    doctor = models.ForeignKey(
        "doctors.Doctor",
        on_delete=models.CASCADE,
        verbose_name="Médico",
    )
    patient = models.ForeignKey(
        "patients.Patient",
        on_delete=models.CASCADE,
        verbose_name="Paciente",
    )
    appointment = models.ForeignKey(
        "appointments.Appointment",
        on_delete=models.CASCADE,
        verbose_name="Cita",
    )

    class Meta:
        verbose_name = "Tratamiento"
        verbose_name_plural = "Tratamientos"
        default_permissions = ()
        permissions = [
            ("list_treatment", "Can list treatment"),
            ("get_treatment", "Can get treatment"),
            ("add_treatment", "Can add treatment"),
            ("change_treatment", "Can change treatment"),
            ("delete_treatment", "Can delete treatment"),
        ]

    def get_status_text(self):
        status_choices = dict(self._meta.get_field("status").flatchoices)
        return status_choices.get(self.status, "Desconocido")

    def __str__(self):
        return (
            self.description
            + " - "
            + self.patient.user.name
            + " - "
            + self.doctor.user.name
        )
