from apps.doctors.models import Doctor
from apps.schedules.models import Schedule
from rest_framework import serializers


class DoctorScheduleSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un médico.

    Este serializador maneja la representación de los datos de un médico,

    Args:
        validated_data (dict): Datos validados para la representación del médico.

    Returns:
        dict: Diccionario con los datos del médico.
    """

    class Meta:
        model = Doctor
        fields = ["id", "user"]


class ScheduleSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un horario.

    Este serializador maneja la representación de los datos de un horario,

    Args:
        validated_data (dict): Datos validados para la representación del horario.

    Returns:
        dict: Diccionario con los datos del horario.
    """

    doctor = DoctorScheduleSerializer(read_only=True)

    class Meta:
        model = Schedule
        exclude = ["state", "created_date", "modified_date", "deleted_date"]


class CreateScheduleSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un horario.

    Este serializador maneja la representación de los datos de un horario,

    Args:
        validated_data (dict): Datos validados para la representación del horario.

    Returns:
        dict: Diccionario con los datos del horario.
    """

    class Meta:
        model = Schedule
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
