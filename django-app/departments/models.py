from django.db import models

from base.models import BaseModel


class Department(BaseModel):
  name = models.CharField(verbose_name='Nombre', max_length=50, unique=True)
  description = models.TextField(verbose_name='Descripción', max_length=255, blank=True, null=True)
  
  class Meta:
    verbose_name = 'Departamento'
    verbose_name_plural = 'Departamentos'
    default_permissions = ()
    permissions = [
      ('list_department', 'Can list department'),
      ('get_department', 'Can get department'),
      ('add_department', 'Can add department'),
      ('change_department', 'Can change department'),
      ('delete_department', 'Can delete department'),
    ]
    
  def __str__(self):
    return self.name


class Room(BaseModel):
  name = models.CharField(verbose_name='Nombre', max_length=50, unique=True)
  description = models.TextField(verbose_name='Descripción', max_length=255, blank=True, null=True)
  type = models.CharField(verbose_name='Tipo', max_length=50, blank=True, null=True)
  location = models.CharField(verbose_name='Ubicación', max_length=50,)
  capacity = models.IntegerField(verbose_name='Capacidad', blank=True, null=True)
  is_available = models.BooleanField(verbose_name='Disponible', default=True)
  department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name='Departamento', blank=True, null=True)
  
  class Meta:
    verbose_name = 'Sala'
    verbose_name_plural = 'Salas'
    default_permissions = ()
    permissions = [
      ('list_room', 'Can list room'),
      ('get_room', 'Can get room'),
      ('add_room', 'Can add room'),
      ('change_room', 'Can change room'),
      ('delete_room', 'Can delete room'),
    ]
    
  def __str__(self):
    if self.department is None:
      return self.name + ' (' + self.location + ')'
    return self.name + ' (' + self.location + ') - ' + self.department.name