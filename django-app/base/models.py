from django.db import models

from simple_history.models import HistoricalRecords

# Create your models here.
class BaseModel(models.Model):
  """Model definition for BaseModel."""
  
  id = models.AutoField(primary_key=True)
  state = models.BooleanField(verbose_name='Estado', default=True)
  created_date = models.DateTimeField(verbose_name='Fecha de Creación', auto_now=False, auto_now_add=True)
  modified_date = models.DateTimeField(verbose_name='Fecha de Modificación', auto_now=True, auto_now_add=False)
  deleted_date = models.DateTimeField(verbose_name='Fecha de Eliminación', auto_now=True, auto_now_add=False)
  historical = HistoricalRecords(user_model='users.User', inherit=True)

  @property
  def _history_user(self):
    return self.changed_by
  
  @_history_user.setter
  def _history_user(self, value):
    self.changed_by = value
  
  class Meta:
    abstract = True
    verbose_name = 'Modelo Base'
    verbose_name_plural = 'Modelos Base'