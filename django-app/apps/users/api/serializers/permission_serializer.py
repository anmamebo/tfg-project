from django.contrib.auth.models import Permission
from rest_framework import serializers


class PermissionSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un permiso.

    Este serializador maneja la representación de los datos de un permiso.

    Args:
        validated_data (dict): Datos validados para la representación del permiso.

    Returns:
        dict: Diccionario con los datos del permiso.
    """

    content_type = serializers.StringRelatedField(source="content_type.model")

    class Meta:
        model = Permission
        fields = "__all__"
