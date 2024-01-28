from apps.schedules.models import Schedule
from apps.schedules.serializers import ScheduleSerializer
from config.permissions import IsDoctor
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class ScheduleViewSet(viewsets.GenericViewSet):
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

    @method_permission_classes([IsDoctor])
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
        doctor = getattr(request.user, "doctor", None)

        schedules = self.get_queryset().filter(doctor=doctor).order_by("start_time")
        serializer = self.get_serializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
