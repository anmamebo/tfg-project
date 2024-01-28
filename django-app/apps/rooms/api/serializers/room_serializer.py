from apps.departments.api.serializers.department_serializer import DepartmentSerializer
from apps.rooms.models import Room
from rest_framework import serializers


class BasicRoomSerializer(serializers.ModelSerializer):
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
        exclude = ["state", "created_date", "modified_date", "deleted_date"]


class RoomSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una sala con su departamento.

    Este serializador maneja la representación de los datos de una sala,
    incluyendo información sobre el departamento al que pertenece.

    Args:
        validated_data (dict): Datos validados para la representación de la sala.

    Returns:
        dict: Diccionario con los datos de la sala.
    """

    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Room
        exclude = ["created_date", "modified_date", "deleted_date"]
