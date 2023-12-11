from apps.departments.models import Department, Room
from apps.doctors.api.serializers.doctor_serializer import (
    DoctorInDepartmentListSerializer,
)
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        exclude = ["created_date", "modified_date", "deleted_date"]


class RoomForDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "name", "type", "location", "capacity"]


class DepartmentWithDoctorsSerializer(serializers.ModelSerializer):
    doctor_set = DoctorInDepartmentListSerializer(read_only=True, many=True)
    room_set = RoomForDepartmentSerializer(read_only=True, many=True)

    class Meta:
        model = Department
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
