from django.contrib.auth.models import Group
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un grupo.

    Este serializador maneja la representación de los datos de un grupo.

    Args:
        validated_data (dict): Datos validados para la representación del grupo.

    Returns:
        dict: Diccionario con los datos del grupo.
    """

    class Meta:
        model = Group
        fields = "__all__"


class GroupListSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un grupo.

    Este serializador maneja la representación de los datos de un grupo.

    Args:
        validated_data (dict): Datos validados para la representación del grupo.

    Returns:
        dict: Diccionario con los datos del grupo.
    """

    class Meta:
        model = Group

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "name": instance.name,
        }
