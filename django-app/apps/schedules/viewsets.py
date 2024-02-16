from apps.doctors.models import Doctor
from apps.schedules.models import Schedule
from apps.schedules.serializers import CreateScheduleSerializer, ScheduleSerializer
from config.permissions import IsAdministrator, IsAdministratorOrDoctor, IsDoctor
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class ScheduleViewSet(viewsets.GenericViewSet, ErrorResponseMixin):
    """
    Vista para gestionar horarios.

    Esta vista permite realizar operaciones CRUD para horarios.

    Attributes:
        model (Model): El modelo de horario a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del horario.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de horarios.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Schedule
    serializer_class = ScheduleSerializer
    list_serializer_class = ScheduleSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(state=True).all()
        return self.queryset

    @method_permission_classes([IsAdministrator])
    def create(self, request):
        """
        Crea un nuevo horario.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el horario fue creado o no.
        """
        serializer = CreateScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Turno añadido correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="No se pudo añadir el turno.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctor])
    @action(detail=False, methods=["get"], url_path="doctor")
    def get_by_doctor(self, request):
        """
        Recupera los horarios de un médico, siempre y cuando el usuario sea un médico.

        Permisos requeridos:
            - El usuario debe ser médico.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene los horarios del médico.
        """
        doctor_id = request.GET.get("doctor_id", None)
        doctor = get_object_or_404(Doctor, pk=doctor_id)

        schedules = self.get_queryset().filter(doctor=doctor).order_by("start_time")
        serializer = self.get_serializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsDoctor])
    @action(detail=False, methods=["get"], url_path="doctor/not-assigned")
    def get_not_asigned_schedules_by_doctor(self, request):
        """
        Recupera los horarios que no tienen una cita asignada

        Permisos requeridos:
            - El usuario debe ser médico.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene los horarios no asignados.
        """
        doctor = getattr(request.user, "doctor", None)

        if doctor is None:
            return self.error_response(
                message="El médico no ha sido encontrado",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        schedules = (
            self.get_queryset()
            .filter(doctor=doctor, appointment__isnull=True)
            .order_by("start_time")
        )
        serializer = self.get_serializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
