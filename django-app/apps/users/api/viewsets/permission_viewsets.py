from apps.users.api.serializers.permission_serializer import PermissionSerializer
from common_mixins.pagination_mixin import PaginationMixin
from config.permissions import IsAdministrator
from django.contrib.auth.models import Permission
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class PermissionViewSet(viewsets.GenericViewSet, PaginationMixin):
    """
    Vista para gestionar permisos.

    Esta vista permite realizar operaciones CRUD para permisos.

    Attributes:
        model (Model): El modelo de permiso a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del permiso.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de permisos.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Permission
    serializer_class = PermissionSerializer
    list_serializer_class = PermissionSerializer
    queryset = Permission.objects.all()

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all()
        return self.queryset

    @method_permission_classes([IsAdministrator])
    def list(self, request):
        """
        Lista todos los permisos.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Parámetros opcionales:
            paginate (bool): Indica si se desea paginar los resultados.
            search (str): Una cadena de texto para buscar permisos.
            ordering (str): El campo por el que se ordenarán los permisos.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de permisos.
        """
        permissions = self.get_queryset()

        permissions = self.filter_and_order_permissions(permissions)

        return self.conditional_paginated_response(
            permissions, self.list_serializer_class
        )

    def filter_and_order_permissions(self, permissions):
        """
        Filtra y ordena los permisos.

        Args:
            permissions (QuerySet): El conjunto de permisos.

        Returns:
            QuerySet: El conjunto de permisos filtrados y ordenados.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)

        if query:
            # Buscar en múltiples campos utilizando la cláusula Q de Django
            permissions = permissions.filter(
                Q(name__icontains=query)
                | Q(codename__icontains=query)
                | Q(content_type__model__icontains=query)
            )

        if ordering:
            permissions = permissions.order_by(ordering)

        return permissions
