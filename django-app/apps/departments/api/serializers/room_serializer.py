from apps.departments.api.serializers.department_serializer import DepartmentSerializer
from apps.departments.models import Room
from rest_framework import serializers


class BasicRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        exclude = ["state", "created_date", "modified_date", "deleted_date"]


class RoomSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Room
        exclude = ["created_date", "modified_date", "deleted_date"]
