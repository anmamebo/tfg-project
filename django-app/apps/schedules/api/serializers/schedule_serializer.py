from apps.doctors.models import Doctor
from apps.schedules.models import Schedule
from rest_framework import serializers


class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "user"]


class ScheduleSerializer(serializers.ModelSerializer):
    doctor = DoctorScheduleSerializer(read_only=True)

    class Meta:
        model = Schedule
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
