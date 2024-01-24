from uuid import UUID

from apps.departments.models import Department
from faker import Factory
from rest_framework import status
from tests.factories.department.department import DepartmentFactory
from tests.test_setup import PATIENT, TestSetUp

faker = Factory.create()


class DepartmentTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de departamentos.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/departments/departments/"

    def test_department_create(self):
        """
        Prueba la creación de un departamento.
        """
        department_data = {
            "name": faker.name(),
            "description": faker.text(),
        }

        response = self.client.post(self.url, department_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(
            Department.objects.all().count(), 1, "El departamento no se creó."
        )
        self.assertEqual(
            response.data["message"],
            "Departamento creado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_department_create_error(self):
        """
        Prueba la creación de un departamento con errores,
        ya que un paciente no puede crear un departamento.
        """
        self.setUp(user_group=PATIENT)

        department_data = {
            "name": faker.name(),
            "description": faker.text(),
        }

        response = self.client.post(self.url, department_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            "El usuario ha accedido a un recurso que no tiene permitido.",
        )
        self.assertEqual(
            Department.objects.all().count(), 0, "El departamento se creó."
        )

    def test_department_retrieve(self):
        """
        Prueba la obtención de un departamento.
        """
        department = DepartmentFactory()

        response = self.client.get(f"{self.url}{department.id}/")

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            response.data["name"],
            department.name,
            "El nombre del departamento no coincide.",
        )
        self.assertEqual(
            response.data["description"],
            department.description,
            "La descripción del departamento no coincide.",
        )

    def test_department_retrieve_error(self):
        """
        Prueba la obtención de un departamento que no existe.
        """
        invalid_uuid = UUID("00000000-0000-0000-0000-000000000000")

        response = self.client.get(f"{self.url}{invalid_uuid}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET no fue exitosa.",
        )

    def test_department_list(self):
        """
        Prueba la obtención de todos los departamentos.
        """
        departments = DepartmentFactory.create_batch(10)

        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            len(departments),
            "La longitud de la respuesta no coincide con la cantidad de departamentos creados",
        )
        self.assertCountEqual(
            [entry["name"] for entry in response.data],
            [department.name for department in departments],
            "Los nombres de los departamentos no coinciden.",
        )
