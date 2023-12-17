from datetime import datetime, timedelta

import pytz
from apps.appointments.api.permissions.appointment_permissions import IsAppointmentOwner
from apps.appointments.api.serializers.appointment_serializer import (
    AppointmentListSerializer,
)
from apps.appointments.models import Appointment
from config.permissions import (
    IsAdministrator,
    IsAdministratorOrDoctor,
    IsDoctor,
    IsPatient,
)
from config.settings import TIME_ZONE
from django.db.models import F, Q
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes

tz = pytz.timezone(TIME_ZONE)  # Zona horaria de la aplicación


class AppointmentViewSet(viewsets.GenericViewSet):
    """
    Vista para gestionar citas.

    Esta vista permite realizar operaciones CRUD para citas.

    Attributes:
        model (Model): El modelo de cita a gestionar.
        serializer_class (Serializer): El serializador para representar los datos de la cita.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de citas.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
        status_transitions (dict): Las transiciones de estado válidas para una cita.
    """

    model = Appointment
    serializer_class = AppointmentListSerializer
    list_serializer_class = AppointmentListSerializer
    queryset = None
    status_transitions = {
        "pending": ["scheduled", "cancelled"],
        "scheduled": [
            "in_progress",
            "completed",
            "rescheduled",
            "no_show",
            "cancelled",
        ],
        "in_progress": ["completed", "rescheduled"],
        "completed": ["rescheduled"],
        "rescheduled": ["in_progress", "completed", "no_show", "cancelled"],
        "no_show": ["rescheduled", "scheduled"],
        "cancelled": [],
    }

    # Recupera el objeto basado en el identificador en la URL
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsAdministrator])
    def list(self, request):
        """
        Lista todas las citas.

        Permisos requeridos:
            - El usuario debe ser un administrador.

        Parámetros opcionales:
            state (str): El estado de la cita (true: activas, false: no activas).

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de citas.
        """
        appointments = self.get_queryset()

        appointments = self.filter_state_appointments(appointments)

        page = self.paginate_queryset(appointments)
        if page is not None:
            appointments_serializer = self.list_serializer_class(page, many=True)
            return self.get_paginated_response(appointments_serializer.data)

        appointments_serializer = self.list_serializer_class(appointments, many=True)
        return Response(appointments_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsDoctor, IsAppointmentOwner])
    def update(self, request, pk=None):
        """
        Actualiza una cita.

        Permisos requeridos:
            - El usuario debe ser un médico.
            - El usuario debe ser el médico de la cita.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la cita.

        Returns:
            Response: La respuesta que contiene la cita.
        """
        appointment = self.get_object(pk)
        appointment_serializer = self.serializer_class(
            appointment, data=request.data, partial=True
        )
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return Response(
                {"message": "La cita ha sido actualizada."}, status=status.HTTP_200_OK
            )

        return Response(
            {
                "message": "Hay errores en la actualización",
                "errors": appointment_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsDoctor])
    @action(detail=False, methods=["get"])
    def list_for_doctor(self, request):
        """
        Lista todas las citas de un doctor ordenadas por fecha más cercana.

        Permisos requeridos:
            - El usuario debe ser un médico.

        Parámetros opcionales:
            status (list): Los estados de las citas a filtrar.
            search (str): El texto a buscar.
            ordering (str): El campo por el cual se ordenarán las citas.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de citas.
        """
        doctor = getattr(request.user, "doctor", None)
        appointments = (
            self.get_queryset().filter(doctor=doctor).order_by("schedule__start_time")
        )  # Filtra las citas del doctor

        desired_statuses = request.GET.getlist("status", None)
        if desired_statuses:
            appointments = appointments.filter(
                status__in=desired_statuses
            )  # Filtra las citas por estados

        appointments = self.filter_appointments(appointments)  # Filtra las citas
        appointments = self.order_appointments(appointments)  # Ordena las citas

        page = self.paginate_queryset(appointments)  # Pagina las citas
        if page is not None:
            appointments_serializer = self.list_serializer_class(page, many=True)
            return self.get_paginated_response(appointments_serializer.data)

        appointments_serializer = self.list_serializer_class(appointments, many=True)
        return Response(appointments_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsPatient])
    @action(detail=False, methods=["get"])
    def list_for_patient(self, request):
        """
        Lista todas las citas de un paciente ordenadas por fecha más cercana.

        Permisos requeridos:
            - El usuario debe ser un paciente.

        Parámetros opcionales:
            status (list): Los estados de las citas a filtrar.
            search (str): El texto a buscar.
            ordering (str): El campo por el cual se ordenarán las citas.
            paginate (str): Indica si se debe paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de citas.
        """
        patient = getattr(request.user, "patient", None)

        # Filtra las citas del paciente y ordena las citas, primero muestra las
        # más cercanas que tienen horario y luego las que no tienen horario por
        # fecha de solicitud más reciente
        appointments = (
            self.get_queryset()
            .filter(patient=patient)
            .order_by(
                F("schedule__start_time").asc(nulls_last=True),
                "-request_date",
            )
        )

        desired_statuses = request.GET.getlist("status", None)
        if desired_statuses:
            appointments = appointments.filter(
                status__in=desired_statuses
            )  # Filtra las citas por estados

        appointments = self.filter_appointments(appointments)  # Filtra las citas
        appointments = self.order_appointments(appointments)  # Ordena las citas

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(appointments)  # Pagina las citas
            if page is not None:
                appointments_serializer = self.list_serializer_class(page, many=True)
                return self.get_paginated_response(appointments_serializer.data)

        appointments_serializer = self.list_serializer_class(appointments, many=True)
        return Response(appointments_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsDoctor, IsAppointmentOwner])
    @action(detail=True, methods=["get"])
    def retrieve_for_doctor(self, request, pk=None):
        """
        Recupera una cita de un doctor.

        Permisos requeridos:
            - El usuario debe ser un médico.
            - El usuario debe ser el médico de la cita.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la cita.

        Returns:
            Response: La respuesta que contiene la cita.
        """
        appointment = self.get_object(pk)
        appointment_serializer = self.serializer_class(appointment)
        return Response(appointment_serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["put"])
    def update_status(self, request, pk=None):
        """
        Actualiza el estado de una cita, siempre y cuando
        la transición de estado sea válida.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la cita.

        Returns:
            Response: La respuesta que contiene la cita.
        """
        new_status = request.data.get("status", None)

        if not new_status:  # Si no se envió el estado
            return Response(
                {"message": "El estado es requerido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointment = self.get_object(pk)
        current_status = appointment.status

        if new_status not in self.status_transitions.get(
            current_status, []
        ):  # Si el estado no es válido
            return Response(
                {"message": "El estado no es válido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointment.status = new_status

        if new_status == "completed":
            appointment.end_time = tz.localize(
                datetime.now()
            )  # Establece la hora de finalización
            appointment.actual_duration = (
                appointment.end_time - appointment.time_patient_arrived
            ).total_seconds() / 60  # Calcula la duración real
        elif new_status == "in_progress":
            appointment.time_patient_arrived = tz.localize(
                datetime.now()
            )  # Establece la hora de llegada del paciente

        appointment.save()

        return Response(
            {"message": "El estado de la cita ha sido actualizado."},
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsDoctor])
    @action(detail=False, methods=["get"])
    def list_for_doctor_by_date(self, request):
        """
        Lista todas las citas de un médico de un día concreto.

        Permisos requeridos:
            - El usuario debe ser un médico.

        Parámetros opcionales:
            date (str): La fecha de las citas a listar.
            status (list): Los estados de las citas a filtrar.
            search (str): El texto a buscar.
            ordering (str): El campo por el cual se ordenarán las citas.
            paginate (str): Indica si se debe paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de citas.
        """
        doctor = getattr(request.user, "doctor", None)

        date_str = self.request.query_params.get("date", None)

        if not date_str:  # Si no se envió la fecha
            return Response(
                {"message": "La fecha es requerida."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            next_day = date + timedelta(days=1)
        except ValueError:  # Si la fecha no es válida
            return Response(
                {"message": "La fecha no es válida."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointments = Appointment.objects.filter(
            doctor=doctor,
            schedule__start_time__gt=date,
            schedule__start_time__lt=next_day,
        ).order_by(
            "schedule__start_time"
        )  # Filtra las citas del doctor

        desired_statuses = request.GET.getlist("status", None)
        if desired_statuses:
            appointments = appointments.filter(
                status__in=desired_statuses
            )  # Filtra las citas por estados

        appointments = self.filter_appointments(appointments)  # Filtra las citas
        appointments = self.order_appointments(appointments)  # Ordena las citas

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(appointments)  # Pagina las citas
            if page is not None:
                appointments_serializer = self.list_serializer_class(page, many=True)
                return self.get_paginated_response(appointments_serializer.data)

        appointments_serializer = self.list_serializer_class(appointments, many=True)
        return Response(appointments_serializer.data, status=status.HTTP_200_OK)

    def filter_appointments(self, appointments):
        """
        Filtra las citas.

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        query = self.request.query_params.get("search", None)
        if query:
            appointments = appointments.filter(
                Q(patient__user__name__icontains=query)
                | Q(patient__user__last_name__icontains=query)
                | Q(reason__icontains=query)
            )

        return appointments

    def order_appointments(self, appointments):
        """
        Ordena las citas.

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas ordenadas.
        """
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            appointments = appointments.order_by(ordering)

        return appointments

    def filter_state_appointments(self, appointments):
        """
        Filtra las citas por estado (activas / no activas).

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        state = self.request.query_params.get("state", None)
        if state in ["true", "false"]:
            state_boolean = state == "true"
            appointments = appointments.filter(state=state_boolean)

        return appointments
