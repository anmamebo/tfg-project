from apps.appointments.models import Appointment
from apps.doctors.models import Doctor
from apps.medicalspecialties.serializers import MedicalSpecialtySerializer
from apps.medicaltests.models import MedicalTest, MedicalTestAttachment
from apps.patients.models import Patient
from apps.schedules.serializers import ScheduleSerializer
from apps.users.models import User
from rest_framework import serializers


class UserSerializerMedicalTest(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de un usuario.

    Este serializador maneja la representación de los datos de un usuario.
    """

    class Meta:
        model = User
        fields = ["id", "name", "last_name", "email"]


class PatientSerializerMedicalTest(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de un paciente.

    Este serializador maneja la representación de los datos de un paciente.
    """

    user = UserSerializerMedicalTest(read_only=True)

    class Meta:
        model = Patient
        fields = ["id", "social_security", "user"]


class DoctorSerializerMedicalTest(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de un médico.

    Este serializador maneja la representación de los datos de un médico.
    """

    user = UserSerializerMedicalTest(read_only=True)

    class Meta:
        model = Doctor
        fields = ["id", "collegiate_number", "user"]


class AppointmentSerializerMedicalTest(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de una cita.

    Este serializador maneja la representación de los datos de una cita.
    """

    specialty = MedicalSpecialtySerializer(read_only=True)
    schedule = ScheduleSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ["id", "reason", "type", "schedule", "specialty"]


class MedicalTestAttachmentSerializer(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de un adjunto de un examen médico.

    Este serializador maneja la representación de los datos de un adjunto de un examen médico.
    """

    class Meta:
        model = MedicalTestAttachment
        exclude = ["medical_test", "created_date", "modified_date", "deleted_date"]


class MedicalTestSerializer(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de un examen médico.

    Este serializador maneja la representación de los datos de un examen médico.
    """

    patient = PatientSerializerMedicalTest(read_only=True)
    doctor = DoctorSerializerMedicalTest(read_only=True)
    appointment = AppointmentSerializerMedicalTest(read_only=True)
    attachments = MedicalTestAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = MedicalTest
        exclude = ["created_date", "modified_date", "deleted_date"]


class CreateMedicalTestSerializer(serializers.ModelSerializer):
    """
    Serializador para la creación de los datos de un examen médico.

    Este serializador maneja la creación de los datos de un examen médico.
    """

    class Meta:
        model = MedicalTest
        exclude = ["state", "created_date", "modified_date", "deleted_date"]


class AttachmentCreateSerializer(serializers.ModelSerializer):
    """
    Serializador para la representación de los datos de un adjunto de un examen médico.

    Este serializador maneja la representación de los datos de un adjunto de un examen médico.
    """

    class Meta:
        model = MedicalTestAttachment
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
