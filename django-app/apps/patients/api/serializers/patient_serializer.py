from apps.addresses.api.serializers.address_serializer import AddressSerializer
from apps.patients.models import Patient
from apps.users.models import User
from django.contrib.auth.models import Group
from rest_framework import serializers


class UserPatientSerializer(serializers.ModelSerializer):
    """
    Serializador para la creación de un usuario asociado a un paciente.

    Este serializador maneja la creación de usuarios a ser asociados a un paciente.

    Args:
        validated_data (dict): Datos validados para la creación del usuario.

    Returns:
        User: El objeto de usuario creado.

    Raises:
        serializers.ValidationError: Cuando hay errores de validación en los datos.
    """

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class CreatePatientSerializer(serializers.ModelSerializer):
    """
    Serializador para la creación de un paciente.

    Este serializador maneja la creación de pacientes.

    Args:
        validated_data (dict): Datos validados para la creación del paciente.

    Returns:
        Patient: El objeto del paciente creado.

    Raises:
        serializers.ValidationError: Cuando hay errores de validación en los datos.
    """

    user = UserPatientSerializer()
    address = AddressSerializer(required=False)

    class Meta:
        model = Patient
        exclude = ["created_date", "modified_date", "deleted_date"]

    # Se sobreescribe el método create para crear el usuario, el paciente y la dirección (si es que hay)
    def create(self, validated_data):
        user_data = validated_data.pop("user", None)

        if user_data:  # Si hay datos de usuario
            user_serializer = UserPatientSerializer(
                data=user_data
            )  # Se crea el serializador de usuario
            if user_serializer.is_valid():  # Si el serializador es valido
                user = user_serializer.save()  # Se crea el usuario

                group_name = "Paciente"
                group, created = Group.objects.get_or_create(
                    name=group_name
                )  # Se obtiene el grupo de pacientes
                user.groups.add(group)  # Se agrega el usuario al grupo de pacientes

                address_data = validated_data.pop("address", None)
                if address_data:  # Si hay datos de direccion
                    address_serializer = AddressSerializer(
                        data=address_data
                    )  # Se crea el serializador de direccion
                    if address_serializer.is_valid():  # Si el serializador es valido
                        address = address_serializer.save()  # Se crea la direccion

                        patient = Patient.objects.create(
                            user=user, address=address, **validated_data
                        )  # Se crea el paciente
                    else:  # Si el serializador no es valido
                        raise serializers.ValidationError(
                            {"address": address_serializer.errors}
                        )

                else:  # Si no hay datos de direccion
                    patient = Patient.objects.create(
                        user=user, **validated_data
                    )  # Se crea el paciente

                return patient
            else:  # Si el serializador no es valido
                raise serializers.ValidationError({"user": user_serializer.errors})


class PatientSerializer(serializers.ModelSerializer):
    """
    Serializador para la representación de los detalles de un paciente.

    Este serializador maneja la representación de los detalles de un paciente.
    """

    user = serializers.SerializerMethodField(read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Patient
        exclude = ["created_date", "modified_date", "deleted_date"]

    # Se sobreescribe el método get_user para obtener los datos del usuario
    def get_user(self, obj):
        user = obj.user
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "name": user.name,
            "last_name": user.last_name,
        }
