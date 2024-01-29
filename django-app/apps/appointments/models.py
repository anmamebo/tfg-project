from apps.base.models import BaseModel
from django.db import models


class Appointment(BaseModel):
    status_choices = [
        ("pending", "Pendiente"),
        ("scheduled", "Programada"),
        ("in_progress", "En progreso"),
        ("completed", "Completada"),
        ("rescheduled", "Reprogramada"),
        ("no_show", "No presentado"),
        ("cancelled", "Cancelada"),
    ]

    type_choices = [
        ("consultation", "Consulta"),
        ("procedure", "Procedimiento"),
        ("checkup", "Revisión"),
        ("surgery", "Cirugía"),
        ("other", "Otro"),
    ]

    status = models.CharField(
        verbose_name="Estado", max_length=50, choices=status_choices, default="pending"
    )
    type = models.CharField(
        verbose_name="Tipo", max_length=50, choices=type_choices, default="consultation"
    )
    reason = models.TextField(
        verbose_name="Motivo", max_length=255, blank=True, null=True
    )
    observations = models.TextField(
        verbose_name="Observaciones", max_length=255, blank=True, null=True
    )
    estimated_duration = models.IntegerField(
        verbose_name="Duración estimada", blank=True, null=True
    )
    actual_duration = models.IntegerField(
        verbose_name="Duración real", blank=True, null=True
    )
    time_patient_arrived = models.DateTimeField(
        verbose_name="Hora de llegada del paciente", blank=True, null=True
    )
    end_time = models.DateTimeField(
        verbose_name="Hora de finalización", blank=True, null=True
    )
    request_date = models.DateTimeField(
        verbose_name="Fecha de solicitud", auto_now_add=True
    )
    priority = models.IntegerField(verbose_name="Prioridad", blank=True, null=True)
    patient = models.ForeignKey(
        "patients.Patient",
        on_delete=models.CASCADE,
        verbose_name="Paciente",
    )
    room = models.ForeignKey(
        "rooms.Room",
        on_delete=models.CASCADE,
        verbose_name="Sala",
        blank=True,
        null=True,
    )
    doctor = models.ForeignKey(
        "doctors.Doctor",
        on_delete=models.CASCADE,
        verbose_name="Médico",
        blank=True,
        null=True,
    )
    specialty = models.ForeignKey(
        "medicalspecialties.MedicalSpecialty",
        on_delete=models.CASCADE,
        verbose_name="Especialidad",
    )
    schedule = models.ForeignKey(
        "schedules.Schedule",
        on_delete=models.CASCADE,
        verbose_name="Horario",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Cita"
        verbose_name_plural = "Citas"

    def get_status_text(self):
        status_choices = dict(self._meta.get_field("status").flatchoices)
        return status_choices.get(self.status, "Desconocido")

    def get_type_text(self):
        type_choices = dict(self._meta.get_field("type").flatchoices)
        return type_choices.get(self.type, "Desconocido")

    def __str__(self):
        info = []

        if self.status:
            info.append(self.status)

        if self.request_date:
            info.append(self.request_date.strftime("%H:%M , %d/%m/%Y"))

        if self.reason:
            info.append(self.reason)

        if self.patient and self.patient.user:
            info.append(self.patient.user.name + " " + self.patient.user.last_name)

        if self.specialty:
            info.append(self.specialty.name)

        if self.doctor and self.doctor.user:
            info.append(self.doctor.user.name + " " + self.doctor.user.last_name)

        if self.room:
            info.append(self.room.name)

        return " - ".join(info)
