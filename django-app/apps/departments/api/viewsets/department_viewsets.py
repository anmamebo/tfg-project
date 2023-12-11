from apps.departments.api.serializers.department_serializer import (
    DepartmentSerializer,
    DepartmentWithDoctorsSerializer,
)
from apps.departments.models import Department
from config.permissions import IsAdministrator, IsAdministratorOrDoctor
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class DepartmentViewSet(viewsets.GenericViewSet):
    """
    Vista para gestionar departamentos.

    Esta vista permite realizar operaciones CRUD para departamentos.

    Attributes:
        model (Model): El modelo de departamento a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del departamento.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de departamentos.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Department
    serializer_class = DepartmentWithDoctorsSerializer
    list_serializer_class = DepartmentSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctor])
    def list(self, request):
        """
        Lista todos los departamentos.

        Parámetros opcionales:
            state (bool): El estado de los departamentos a listar.
            search (str): Una cadena de texto para buscar departamentos.
            ordering (str): El campo por el que se ordenarán los departamentos.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de departamentos.
        """
        departments = self.get_queryset()

        departments = self.filter_state_departments(
            departments
        )  # Filtra los departamentos por estado.
        departments = self.filter_departments(departments)  # Filtra los departamentos.
        departments = self.order_departments(departments)  # Ordena los departamentos.

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(departments)
            if page is not None:
                departments_serializer = self.list_serializer_class(page, many=True)
                return self.get_paginated_response(departments_serializer.data)

        departments_serializer = self.list_serializer_class(departments, many=True)
        return Response(departments_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAdministrator])
    def create(self, request):
        """
        Crea un departamento.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta el resultado de la operación.
        """
        department_serializer = self.serializer_class(data=request.data)
        if department_serializer.is_valid():
            department_serializer.save()
            return Response(
                {"message": "Departamento creado correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "message": "Hay errores en la creación.",
                "errors": department_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctor])
    def retrieve(self, request, pk=None):
        """
        Obtiene un departamento.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id del departamento a obtener.

        Returns:
            Response: La respuesta que contiene el departamento.
        """
        department = self.get_object(pk)
        department_serializer = self.serializer_class(department)
        return Response(department_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAdministrator])
    def update(self, request, pk=None):
        """
        Actualiza un departamento.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id del departamento a actualizar.

        Returns:
            Response: La respuesta el resultado de la operación.
        """
        department = self.get_object(pk)
        department_serializer = self.serializer_class(department, data=request.data)
        if department_serializer.is_valid():
            department_serializer.save()
            return Response(
                {"message": "Departamento actualizado correctamente."},
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "Hay errores en la actualización.",
                "errors": department_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina un departamento cambiando su estado a False.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id del departamento a eliminar.

        Returns:
            Response: La respuesta el resultado de la operación.
        """
        department = self.get_queryset().filter(id=pk).first()
        if not department:
            return Response(
                {"message": "No se ha encontrado el departamento."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        department.state = False
        department.save()
        return Response(
            {"message": "Departamento eliminado correctamente."},
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsAdministrator])
    @action(detail=True, methods=["put"])
    def activate(self, request, pk=None):
        """
        Activa un departamento cambiando su estado a True.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id del departamento a activar.

        Returns:
            Response: La respuesta el resultado de la operación.
        """
        department = self.get_object(pk)
        if not department:
            return Response(
                {"message": "No se ha encontrado el departamento."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        department.state = True
        department.save()
        return Response(
            {"message": "Departamento activado correctamente."},
            status=status.HTTP_200_OK,
        )

    def filter_departments(self, departments):
        """
        Filtra los departamentos.

        Args:
            departments (QuerySet): El conjunto de datos a filtrar.

        Returns:
            QuerySet: El conjunto de datos filtrado.
        """
        query = self.request.query_params.get("search", None)
        if query:
            departments = departments.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )

        return departments

    def order_departments(self, departments):
        """
        Ordena los departamentos.

        Args:
            departments (QuerySet): El conjunto de datos a ordenar.

        Returns:
            QuerySet: El conjunto de datos ordenado.
        """
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            departments = departments.order_by(ordering)

        return departments

    def filter_state_departments(self, departments):
        """
        Filtra los departamentos por estado.

        Args:
            departments (QuerySet): El conjunto de datos a filtrar.

        Returns:
            QuerySet: El conjunto de datos filtrado.
        """
        state = self.request.query_params.get("state", None)
        if state in ["true", "false"]:
            state_boolean = state == "true"
            departments = departments.filter(state=state_boolean)

        return departments
