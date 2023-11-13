from django.db import models

from base.models import BaseModel
from users.models import User


class Doctor(BaseModel):
  user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Usuario')
  collegiate_number = models.CharField(verbose_name='Número de colegiado', max_length=10, unique=True)
  is_available = models.BooleanField(verbose_name='Disponible', default=True)
  departments = models.ManyToManyField('departments.Department', verbose_name='Departamentos', blank=True)
  
  class Meta:
    verbose_name = 'Doctor'
    verbose_name_plural = 'Doctores'
    default_permissions = ()
    permissions = [
      ('list_doctor', 'Can list doctor'),
      ('get_doctor', 'Can get doctor'),
      ('add_doctor', 'Can add doctor'),
      ('change_doctor', 'Can change doctor'),
      ('delete_doctor', 'Can delete doctor'),
    ]
  
  def __str__(self):
    return f'{self.user.name} {self.user.last_name} ({self.user.username}) - {self.user.email}'