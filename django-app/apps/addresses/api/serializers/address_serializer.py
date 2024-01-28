from apps.patients.models import Address
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una dirección.

    Este serializador maneja la representación de los datos de una dirección,
    excluyendo ciertos campos específicos.

    Args:
        validated_data (dict): Datos validados para la representación de la dirección.

    Returns:
        dict: Diccionario con los datos de la dirección.
    """

    class Meta:
        model = Address
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
