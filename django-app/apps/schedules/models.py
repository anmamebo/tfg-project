from apps.base.models import BaseModel
from apps.doctors.models import Doctor
from django.db import models


class Schedule(BaseModel):
    start_time = models.DateTimeField(verbose_name="Hora de inicio")
    end_time = models.DateTimeField(verbose_name="Hora de fin")
    day_of_week = models.IntegerField(verbose_name="Día de la semana", editable=False)
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, verbose_name="Médico", blank=True, null=True
    )

    class Meta:
        verbose_name = "Horario"
        verbose_name_plural = "Horarios"

    def save(self, *args, **kwargs):
        self.day_of_week = self.start_time.weekday()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.start_time} - {self.end_time} ({self.day_of_week})"
