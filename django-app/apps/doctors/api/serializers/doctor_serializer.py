from apps.departments.models import Department
from apps.doctors.models import Doctor
from apps.medicalspecialties.models import MedicalSpecialty
from apps.users.models import User
from django.contrib.auth.models import Group
from rest_framework import serializers


class UserDoctorSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un usuario médico.

    Este serializador maneja la representación de los datos de un usuario médico,
    incluyendo información sobre el usuario.

    Args:
        validated_data (dict): Datos validados para la representación del usuario médico.

    Returns:
        dict: Diccionario con los datos del usuario médico.
    """

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class CreateDoctorSerializer(serializers.ModelSerializer):
    """
    Serializador para representar la creación de un médico.

    Este serializador maneja la representación de la creación de un médico,
    incluyendo información sobre el usuario, departamentos y especialidades médicas.

    Args:
        validated_data (dict): Datos validados para la creación del médico.

    Returns:
        dict: Diccionario con los datos del médico.
    """

    user = UserDoctorSerializer()
    departments = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Department.objects.all(), required=False
    )
    medical_specialties = serializers.PrimaryKeyRelatedField(
        many=True, queryset=MedicalSpecialty.objects.all(), required=False
    )

    class Meta:
        model = Doctor
        exclude = ["created_date", "modified_date", "deleted_date"]

    def create(self, validated_data):
        user_data = validated_data.pop("user", None)
        departments_data = validated_data.pop("departments", None)
        medical_specialties_data = validated_data.pop("medical_specialties", None)

        if user_data:
            user_serializer = UserDoctorSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()

                group_name = "Médico"
                group, created = Group.objects.get_or_create(name=group_name)
                user.groups.add(group)

                doctor = Doctor.objects.create(user=user, **validated_data)

                if departments_data:
                    for department in departments_data:
                        doctor.departments.add(department)

                if medical_specialties_data:
                    for medical_specialty in medical_specialties_data:
                        doctor.medical_specialties.add(medical_specialty)

                return doctor
            else:
                raise serializers.ValidationError({"user": user_serializer.errors})


class DoctorSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un médico.

    Este serializador maneja la representación de los datos de un médico,
    incluyendo información sobre el usuario, departamentos y especialidades médicas.

    Args:
        validated_data (dict): Datos validados para la representación del médico.

    Returns:
        dict: Diccionario con los datos del médico.
    """

    user = serializers.SerializerMethodField(read_only=True)
    departments = serializers.SerializerMethodField(read_only=True)
    medical_specialties = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Doctor
        exclude = ["created_date", "modified_date", "deleted_date"]

    def get_user(self, obj):
        user = obj.user
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "name": user.name,
            "last_name": user.last_name,
        }

    def get_departments(self, obj):
        departments = obj.departments
        return [
            {
                "id": department.id,
                "name": department.name,
            }
            for department in departments.all()
        ]

    def get_medical_specialties(self, obj):
        medical_specialties = obj.medical_specialties
        return [
            {
                "id": medical_specialty.id,
                "name": medical_specialty.name,
            }
            for medical_specialty in medical_specialties.all()
        ]


class DoctorInDepartmentListSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un médico en una lista de departamentos.

    Este serializador maneja la representación de los datos de un médico en una lista de departamentos,
    incluyendo información sobre el usuario.

    Args:
        validated_data (dict): Datos validados para la representación del médico en una lista de departamentos.

    Returns:
        dict: Diccionario con los datos del médico en una lista de departamentos.
    """

    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Doctor
        exclude = [
            "departments",
            "state",
            "created_date",
            "modified_date",
            "deleted_date",
        ]

    def get_user(self, obj):
        user = obj.user
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "name": user.name,
            "last_name": user.last_name,
        }
