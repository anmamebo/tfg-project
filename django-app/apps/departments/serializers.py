from apps.departments.models import Department
from apps.doctors.serializers import DoctorInDepartmentListSerializer
from apps.rooms.models import Room
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un departamento.

    Este serializador maneja la representación de los datos de un departamento,
    excluyendo ciertos campos específicos.

    Args:
        validated_data (dict): Datos validados para la representación del departamento.

    Returns:
        dict: Diccionario con los datos del departamento.
    """

    class Meta:
        model = Department
        exclude = ["created_date", "modified_date", "deleted_date"]


class RoomForDepartmentSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una sala.

    Este serializador maneja la representación de los datos de una sala,
    excluyendo ciertos campos específicos.

    Args:
        validated_data (dict): Datos validados para la representación de la sala.

    Returns:
        dict: Diccionario con los datos de la sala.
    """

    class Meta:
        model = Room
        fields = ["id", "name", "type", "location", "capacity"]


class DepartmentWithDoctorsSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un departamento con sus doctores.

    Este serializador maneja la representación de los datos de un departamento,
    incluyendo información sobre los doctores y salas.

    Args:
        validated_data (dict): Datos validados para la representación del departamento.

    Returns:
        dict: Diccionario con los datos del departamento.
    """

    doctor_set = DoctorInDepartmentListSerializer(read_only=True, many=True)
    room_set = RoomForDepartmentSerializer(read_only=True, many=True)

    class Meta:
        model = Department
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
