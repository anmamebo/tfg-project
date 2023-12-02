from rest_framework import serializers

from appointments.models import Appointment
from schedules.models import Schedule
from patients.api.serializers.patient_serializer import PatientSerializer
from doctors.api.serializers.doctor_serializer import DoctorSerializer
from doctors.api.serializers.medicalspecialty_serializer import MedicalSpecialtySerializer
from departments.api.serializers.room_serializer import RoomSerializer


class ScheduleAppointmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Schedule
    exclude = ['doctor', 'state', 'created_date', 'modified_date', 'deleted_date']

class AppointmentListSerializer(serializers.ModelSerializer):
  """
    Serializador para representar los datos de una lista de citas.

    Este serializador maneja la representación de los datos de una lista de citas.

    Args:
        validated_data (dict): Datos validados para la representación de la lista de citas.

    Returns:
        dict: Diccionario con los datos de la lista de citas.
  """
  patient = PatientSerializer(read_only=True)
  doctor = DoctorSerializer(read_only=True)
  specialty = MedicalSpecialtySerializer(read_only=True)
  room = RoomSerializer(read_only=True)
  schedule = ScheduleAppointmentSerializer(read_only=True)
  
  class Meta:
    model = Appointment
    exclude = ['created_date', 'modified_date', 'deleted_date']