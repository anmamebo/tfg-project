from django.db import models

from base.models import BaseModel


class Appointment(BaseModel):
  status =  [
    ('pending', 'Pendiente'),
    ('scheduled', 'Programada'),
    ('in_progress', 'En progreso'),
    ('completed', 'Completada'),
    ('rescheduled', 'Reprogramada'),
    ('no_show', 'No presentado'),
    ('cancelled', 'Cancelada'),
  ]
  
  type = [
    ('consultation', 'Consulta'),
    ('procedure', 'Procedimiento'),
    ('checkup', 'Revisión'),
    ('surgery', 'Cirugía'),
    ('other', 'Otro'),
  ]
  
  status = models.CharField(verbose_name='Estado', max_length=50, choices=status, default='pending') 
  type = models.CharField(verbose_name='Tipo', max_length=50, choices=type, default='consultation')
  reason = models.TextField(verbose_name='Motivo', max_length=255, blank=True, null=True)
  observations = models.TextField(verbose_name='Observaciones', max_length=255, blank=True, null=True)
  estimated_duration = models.IntegerField(verbose_name='Duración estimada', blank=True, null=True)
  actual_duration = models.IntegerField(verbose_name='Duración real', blank=True, null=True)
  time_patient_arrived = models.DateTimeField(verbose_name='Hora de llegada del paciente', blank=True, null=True)
  end_time = models.DateTimeField(verbose_name='Hora de finalización', blank=True, null=True)
  request_date = models.DateTimeField(verbose_name='Fecha de solicitud', blank=True, null=True)
  priority = models.IntegerField(verbose_name='Prioridad', blank=True, null=True)
  patient = models.ForeignKey('patients.Patient', on_delete=models.CASCADE, verbose_name='Paciente', blank=True, null=True)
  room = models.ForeignKey('departments.Room', on_delete=models.CASCADE, verbose_name='Sala', blank=True, null=True)
  doctor = models.ForeignKey('doctors.Doctor', on_delete=models.CASCADE, verbose_name='Médico', blank=True, null=True)
  specialty = models.ForeignKey('doctors.MedicalSpecialty', on_delete=models.CASCADE, verbose_name='Especialidad', blank=True, null=True)
  schedule = models.ForeignKey('schedules.Schedule', on_delete=models.CASCADE, verbose_name='Horario', blank=True, null=True)
  
  class Meta:
    verbose_name = 'Cita'
    verbose_name_plural = 'Citas'
    default_permissions = ()
    permissions = [
      ('list_appointment', 'Can list appointment'),
      ('get_appointment', 'Can get appointment'),
      ('add_appointment', 'Can add appointment'),
      ('change_appointment', 'Can change appointment'),
      ('delete_appointment', 'Can delete appointment'),
    ]
    
  def __str__(self):
    return self.patient.user.name + ' - ' + self.specialty.name + ' - ' + self.doctor.user.name + ' - ' + self.room.name