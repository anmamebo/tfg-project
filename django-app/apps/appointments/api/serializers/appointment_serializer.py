from apps.appointments.models import Appointment
from apps.departments.api.serializers.room_serializer import RoomSerializer
from apps.doctors.api.serializers.doctor_serializer import DoctorSerializer
from apps.medicalspecialties.api.serializers.medicalspecialty_serializer import (
    MedicalSpecialtySerializer,
)
from apps.patients.api.serializers.patient_serializer import PatientSerializer
from apps.schedules.models import Schedule
from rest_framework import serializers


class ScheduleAppointmentSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una cita en un horario.

    Este serializador maneja la representación de los datos de una cita en un horario,
    excluyendo ciertos campos específicos.

    Args:
        validated_data (dict): Datos validados para la representación de la cita en un horario.

    Returns:
        dict: Diccionario con los datos de la cita en un horario.
    """

    class Meta:
        model = Schedule
        exclude = ["doctor", "state", "created_date", "modified_date", "deleted_date"]


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una cita.

    Este serializador maneja la representación de los datos de una cita,
    incluyendo información sobre el paciente, médico, especialidad médica, sala y horario.

    Args:
        validated_data (dict): Datos validados para la representación de la cita.

    Returns:
        dict: Diccionario con los datos de la cita.
    """

    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    specialty = MedicalSpecialtySerializer(read_only=True)
    room = RoomSerializer(read_only=True)
    schedule = ScheduleAppointmentSerializer(read_only=True)

    class Meta:
        model = Appointment
        exclude = ["created_date", "modified_date", "deleted_date"]


class CreateAppointmentSerializer(serializers.ModelSerializer):
    """
    Serializador para crear una cita.

    Este serializador maneja la creación de una cita,
    excluyendo ciertos campos específicos.

    Args:
        validated_data (dict): Datos validados para la representación de la cita.

    Returns:
        dict: Diccionario con los datos de la cita.
    """

    class Meta:
        model = Appointment
        exclude = ["created_date", "modified_date", "deleted_date"]
