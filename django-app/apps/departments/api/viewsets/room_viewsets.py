from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action

from apps.departments.models import Room
from apps.departments.api.serializers.room_serializer import (
    RoomSerializer,
    BasicRoomSerializer,
)


class RoomViewSet(viewsets.GenericViewSet):
    """
    Vista para gestionar salas.

    Esta vista permite realizar operaciones CRUD para salas.

    Attributes:
        model (Model): El modelo de sala a gestionar.
        serializer_class (Serializer): El serializador para representar los datos de la sala.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de salas.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Room
    serializer_class = RoomSerializer
    list_serializer_class = RoomSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    def list(self, request):
        """
        Lista todas las salas.

        Parámetros opcionales:
            state (bool): El estado de las salas a listar.
            search (str): Una cadena de texto para buscar salas.
            ordering (str): El campo por el que se ordenarán las salas.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de salas.
        """
        rooms = self.get_queryset()

        rooms = self.filter_state_rooms(rooms)  # Filtra las salas por estado.
        rooms = self.filter_rooms(rooms)  # Filtra las salas.
        rooms = self.order_rooms(rooms)  # Ordena las salas.

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(rooms)
            if page is not None:
                rooms_serializer = self.list_serializer_class(page, many=True)
                return self.get_paginated_response(rooms_serializer.data)

        rooms_serializer = self.list_serializer_class(rooms, many=True)
        return Response(rooms_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Crea una sala.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene los datos de la sala creada.
        """
        room_serializer = BasicRoomSerializer(data=request.data)
        if room_serializer.is_valid():
            room = room_serializer.save()
            return Response(
                {
                    "message": "Sala creada correctamente.",
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "message": "Hay errores en la creación.",
                "errors": room_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def retrieve(self, request, pk=None):
        """
        Recupera una sala.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la sala.

        Returns:
            Response: La respuesta que contiene los datos de la sala.
        """
        room = self.get_object(pk)
        room_serializer = self.serializer_class(room)
        return Response(room_serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        """
        Actualiza una sala.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la sala.

        Returns:
            Response: La respuesta que contiene los datos de la sala actualizada.
        """
        room = self.get_object(pk)
        room_serializer = BasicRoomSerializer(room, data=request.data, partial=True)
        if room_serializer.is_valid():
            room_serializer.save()
            return Response(
                {
                    "message": "Sala actualizada correctamente.",
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "Hay errores en la actualización",
                "errors": room_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def destroy(self, request, pk=None):
        """
        Elimina una sala cambiando su estado a False.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la sala.

        Returns:
            Response: La respuesta que contiene el resultado de la eliminación.
        """
        room = self.get_queryset().filter(id=pk).first()
        if not room:
            return Response(
                {
                    "message": "No se encontró la sala.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        room.state = False
        room.is_available = False
        room.save()
        return Response(
            {
                "message": "Sala eliminada correctamente.",
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["put"])
    def activate(self, request, pk=None):
        """
        Activa una sala cambiando su estado a True.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la sala.

        Returns:
            Response: La respuesta que contiene el resultado de la activación.
        """
        room = self.get_object(pk)
        if not room:
            return Response(
                {"message": "No se encontró la sala."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        room.state = True
        room.is_available = True
        room.save()
        return Response(
            {
                "message": "Sala activada correctamente.",
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"])
    def rooms_by_department(self, request):
        """
        Lista todas las salas por departamento.

        Parámetros:
            department (string): El id del departamento.

        Parámetros opcionales:
            search (str): Una cadena de texto para buscar salas.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de salas.
        """
        rooms = self.get_queryset()

        department_id = self.request.query_params.get("department", None)
        if not department_id:  # Si no se envía el id del departamento.
            return Response(
                {"message": "No se encontró el departamento."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        rooms = rooms.filter(
            department__id=department_id
        )  # Filtra las salas por departamento.
        rooms = self.filter_rooms(rooms)  # Filtra las salas.

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(rooms)
            if page is not None:
                rooms_serializer = BasicRoomSerializer(page, many=True)
                return self.get_paginated_response(rooms_serializer.data)

        rooms_serializer = BasicRoomSerializer(rooms, many=True)
        return Response(rooms_serializer.data, status=status.HTTP_200_OK)

    def filter_rooms(self, rooms):
        """
        Filtra las salas.

        Args:
            rooms (QuerySet): El conjunto de datos a filtrar.

        Returns:
            QuerySet: El conjunto de datos filtrado.
        """
        query = self.request.query_params.get("search", None)
        if query:
            rooms = rooms.filter(
                Q(name__icontains=query)
                | Q(type__icontains=query)
                | Q(location__icontains=query)
                | Q(department__name__icontains=query)
                | Q(capacity__icontains=query)
            )

        return rooms

    def order_rooms(self, rooms):
        """
        Ordena las salas.

        Args:
            rooms (QuerySet): El conjunto de datos a ordenar.

        Returns:
            QuerySet: El conjunto de datos ordenado.
        """
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            rooms = rooms.order_by(ordering)

        return rooms

    def filter_state_rooms(self, rooms):
        """
        Filtra las salas por estado.

        Args:
            rooms (QuerySet): El conjunto de datos a filtrar.

        Returns:
            QuerySet: El conjunto de datos filtrado.
        """
        state = self.request.query_params.get("state", None)
        if state in ["true", "false"]:
            state_boolean = state == "true"
            rooms = rooms.filter(state=state_boolean)

        return rooms