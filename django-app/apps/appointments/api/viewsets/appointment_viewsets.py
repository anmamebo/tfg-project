from datetime import datetime, timedelta

import pytz
from apps.appointments.api.mixins.appointment_mixins import GeneratePDFMixin
from apps.appointments.api.permissions.appointment_permissions import IsAppointmentOwner
from apps.appointments.api.serializers.appointment_serializer import (
    AppointmentSerializer,
    CreateAppointmentSerializer,
)
from apps.appointments.models import Appointment
from config.permissions import IsAdministrator, IsDoctor, IsPatient
from config.settings import TIME_ZONE
from django.db.models import F, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes

tz = pytz.timezone(TIME_ZONE)  # Zona horaria de la aplicación


class AppointmentViewSet(
    viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin, GeneratePDFMixin
):
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
    serializer_class = AppointmentSerializer
    list_serializer_class = AppointmentSerializer
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
            search (str): El texto a buscar.
            ordering (str): El campo por el cual se ordenarán las citas.
            paginate (str): Indica si se debe paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de citas.
        """
        appointments = self.get_queryset()

        appointments = self.filter_and_order_appointments(appointments)

        return self.conditional_paginated_response(
            appointments, self.list_serializer_class
        )

    # TODO: Implementar también para el médico
    @method_permission_classes([IsPatient])
    def create(self, request):
        """
        Crea una cita para un paciente.

        Permisos requeridos:
            - El usuario debe ser un paciente.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta con el resultado de la operación.
        """
        patient = getattr(request.user, "patient", None)
        request.data["patient"] = patient.id

        serializer = CreateAppointmentSerializer(data=request.data)
        if serializer.is_valid():
            appointment = serializer.save()

            # TODO: Implemntar lógica de generar cita

            # TODO: Implemntar lógica de enviar correo

            return Response(
                {"message": "La cita ha sido creada."}, status=status.HTTP_201_CREATED
            )

        return self.error_response(
            message="Hay errores en la creación",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsDoctor, IsAppointmentOwner])
    def retrieve(self, request, pk=None):
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

        return self.error_response(
            message="Hay errores en la actualización",
            errors=appointment_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsDoctor])
    @action(detail=False, methods=["get"], url_path="doctor")
    def list_for_doctor(self, request):
        """
        Lista todas las citas de un doctor ordenadas por fecha más cercana.

        Permisos requeridos:
            - El usuario debe ser un médico.

        Parámetros opcionales:
            state (str): El estado de la cita (true: activas, false: no activas).
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
        appointments = (
            self.get_queryset().filter(doctor=doctor).order_by("schedule__start_time")
        )

        appointments = self.filter_appointments_by_statuses(appointments)
        appointments = self.filter_and_order_appointments(appointments)

        return self.conditional_paginated_response(
            appointments, self.list_serializer_class
        )

    @method_permission_classes([IsPatient])
    @action(detail=False, methods=["get"], url_path="patient")
    def list_for_patient(self, request):
        """
        Lista todas las citas de un paciente ordenadas por fecha más cercana.

        Permisos requeridos:
            - El usuario debe ser un paciente.

        Parámetros opcionales:
            state (str): El estado de la cita (true: activas, false: no activas).
            status (list): Los estados de las citas a filtrar.
            type (list): Los tipos de las citas a filtrar.
            specialty (list): Las especialidades de las citas a filtrar.
            search (str): El texto a buscar.
            ordering (str): El campo por el cual se ordenarán las citas.
            paginate (str): Indica si se debe paginar los resultados.
            schedule__start_time__gte (str): La fecha de inicio de la cita.
            schedule__start_time__lte (str): La fecha de fin de la cita.
            request_date__gte (str): La fecha de solicitud de la cita.
            request_date__lte (str): La fecha de solicitud de la cita.

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

        appointments = self.filter_appointments_by_statuses(appointments)
        appointments = self.filter_appointments_by_types(appointments)
        appointments = self.filter_appointments_by_specialties(appointments)
        appointments = self.filter_appointments_by_date_range(
            appointments, "schedule__start_time"
        )
        appointments = self.filter_appointments_by_date_range(
            appointments, "request_date"
        )
        appointments = self.filter_and_order_appointments(appointments)

        return self.conditional_paginated_response(
            appointments, self.list_serializer_class
        )

    @action(detail=True, methods=["put"], url_path="status")
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
            return self.error_response(
                message="El estado es requerido.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        appointment = self.get_object(pk)
        current_status = appointment.status
        valid_transitions = self.status_transitions.get(current_status, [])

        if new_status not in valid_transitions:  # Si el estado no es válido
            return self.error_response(
                message="El estado no es válido.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        if new_status == "completed":
            self.mark_as_completed(appointment)
        elif new_status == "in_progress":
            self.mark_as_in_progress(appointment)
        else:
            appointment.status = new_status
            appointment.save()

        return Response(
            {"message": "El estado de la cita ha sido actualizado."},
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsDoctor])
    @action(detail=False, methods=["get"], url_path="doctor/date")
    def list_for_doctor_by_date(self, request):
        """
        Lista todas las citas de un médico de un día concreto.

        Permisos requeridos:
            - El usuario debe ser un médico.

        Parámetros requeridos:
            date (str): La fecha de las citas a listar.

        Parámetros opcionales:
            state (str): El estado de la cita (true: activas, false: no activas).
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

        appointments = self.get_queryset().filter(doctor=doctor)

        appointments = self.filter_appointments_by_date(
            appointments, "schedule__start_time"
        ).order_by("schedule__start_time")
        appointments = self.filter_appointments_by_statuses(appointments)
        appointments = self.filter_and_order_appointments(appointments)

        return self.conditional_paginated_response(
            appointments, self.list_serializer_class
        )

    @method_permission_classes([IsPatient])
    @action(detail=False, methods=["get"], url_path="patient/date")
    def list_for_patient_by_date(self, request):
        """
        Lista todas las citas de un paciente de un día concreto.

        Permisos requeridos:
            - El usuario debe ser un paciente.

        Parámetros requeridos:
            date (str): La fecha de las citas a listar.

        Parámetros opcionales:
            state (str): El estado de la cita (true: activas, false: no activas).
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

        appointments = self.get_queryset().filter(patient=patient)

        appointments = self.filter_appointments_by_date(
            appointments, "schedule__start_time"
        ).order_by("schedule__start_time")
        appointments = self.filter_appointments_by_statuses(appointments)
        appointments = self.filter_and_order_appointments(appointments)

        return self.conditional_paginated_response(
            appointments, self.list_serializer_class
        )

    @method_permission_classes([IsPatient])
    @action(detail=True, methods=["get"], url_path="pdf")
    def get_pdf(self, request, pk=None):
        """
        Genera un PDF con la información de una cita.

        Permisos requeridos:
            - El usuario debe ser un paciente.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la cita.

        Returns:
            Response: La respuesta que contiene el PDF.
        """
        appointment = self.get_object(pk)

        return self.generate_pdf(appointment)

    def filter_and_order_appointments(self, appointments):
        """
        Filtra y ordena las citas.

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas filtradas y ordenadas.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)
        state = self.request.query_params.get("state", None)

        if query:
            appointments = appointments.filter(
                Q(patient__user__name__icontains=query)
                | Q(patient__user__last_name__icontains=query)
                | Q(reason__icontains=query)
            )

        if ordering:
            appointments = appointments.order_by(ordering)

        if state in ["true", "false"]:
            state_boolean = state == "true"
            appointments = appointments.filter(state=state_boolean)

        return appointments

    def filter_appointments_by_statuses(self, appointments):
        """
        Filtra las citas por estados.

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        desired_statuses = self.request.GET.getlist("status", None)
        if desired_statuses:
            return appointments.filter(status__in=desired_statuses)

        return appointments

    def filter_appointments_by_types(self, appointments):
        """
        Filtra las citas por tipos.

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        desired_types = self.request.GET.getlist("type", None)
        if desired_types:
            return appointments.filter(type__in=desired_types)

        return appointments

    def filter_appointments_by_specialties(self, appointments):
        """
        Filtra las citas por especialidades.

        Args:
            appointments (QuerySet): El conjunto de citas.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        desired_specialties = self.request.GET.getlist("specialty", None)
        if desired_specialties:
            return appointments.filter(specialty__in=desired_specialties)

        return appointments

    def filter_appointments_by_date_range(self, appointments, date_field):
        """
        Filtra las citas por rango de fechas.

        Args:
            appointments (QuerySet): El conjunto de citas.
            date_field (str): El campo de fecha de la cita.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        start_date_str = self.request.query_params.get(f"{date_field}__gte", None)
        end_date_str = self.request.query_params.get(f"{date_field}__lte", None)

        if start_date_str and end_date_str:
            try:
                start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
                start_date = timezone.make_aware(
                    datetime.combine(start_date, datetime.min.time())
                )
                end_date = timezone.make_aware(
                    datetime.combine(end_date, datetime.max.time())
                )
            except ValueError:
                return self.error_response(
                    message="La fecha no es válida.",
                    status_code=status.HTTP_400_BAD_REQUEST,
                )

            return appointments.filter(
                **{f"{date_field}__range": [start_date, end_date]}
            )

        return appointments

    def filter_appointments_by_date(self, appointments, date_field):
        """
        Filtra las citas por fecha.

        Args:
            appointments (QuerySet): El conjunto de citas.
            date_field (str): El campo de fecha de la cita.

        Returns:
            QuerySet: El conjunto de citas filtradas.
        """
        date_str = self.request.query_params.get("date", None)

        if not date_str:  # Si no se envió la fecha
            return self.error_response(
                message="La fecha es requerida.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            next_day = date + timedelta(days=1)
        except ValueError:  # Si la fecha no es válida
            return self.error_response(
                message="La fecha no es válida.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        return appointments.filter(
            **{f"{date_field}__gt": date, f"{date_field}__lt": next_day}
        )

    def mark_as_completed(self, appointment):
        """
        Marca una cita como completada.

        Args:
            appointment (Appointment): La cita a marcar como completada.

        Returns:
            Appointment: La cita marcada como completada.
        """
        appointment.status = "completed"
        appointment.end_time = tz.localize(datetime.now())
        appointment.actual_duration = (
            appointment.end_time - appointment.time_patient_arrived
        ).total_seconds() / 60
        appointment.save()

        return appointment

    def mark_as_in_progress(self, appointment):
        """
        Marca una cita como en progreso.

        Args:
            appointment (Appointment): La cita a marcar como en progreso.

        Returns:
            Appointment: La cita marcada como en progreso.
        """
        appointment.status = "in_progress"
        appointment.time_patient_arrived = tz.localize(datetime.now())
        appointment.save()

        return appointment
