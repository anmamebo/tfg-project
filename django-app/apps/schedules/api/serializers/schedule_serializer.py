from rest_framework import serializers

from apps.schedules.models import Schedule
from apps.doctors.models import Doctor


class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "user"]


class ScheduleSerializer(serializers.ModelSerializer):
    doctor = DoctorScheduleSerializer(read_only=True)

    class Meta:
        model = Schedule
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
