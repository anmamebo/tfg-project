from uuid import UUID

from apps.departments.models import Department
from faker import Factory
from rest_framework import status
from tests.factories.department import DepartmentFactory
from tests.test_setup import PATIENT, TestSetUp

faker = Factory.create()


class DepartmentTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de departamentos.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/departments/"

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

    def test_department_list_filter(self):
        """
        Prueba la obtención de todos los departamentos filtrados por nombre.
        """
        departments = DepartmentFactory.create_batch(10)

        response = self.client.get(f"{self.url}?search={departments[0].name}")

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            1,
            "La longitud de la respuesta no coincide con la cantidad de departamentos creados",
        )
        self.assertEqual(
            response.data[0]["name"],
            departments[0].name,
            "El nombre del departamento no coincide.",
        )

    def test_department_update(self):
        """
        Prueba la actualización de un departamento.
        """
        department = DepartmentFactory()

        department_data = {
            "name": faker.name(),
            "description": faker.text(),
        }

        response = self.client.put(
            f"{self.url}{department.id}/", department_data, format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            Department.objects.all().count(), 1, "El departamento no se actualizó."
        )
        self.assertEqual(
            response.data["message"],
            "Departamento actualizado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_department_destroy(self):
        """
        Prueba la eliminación de un departamento.
        """
        department = DepartmentFactory()

        response = self.client.delete(f"{self.url}{department.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertFalse(
            Department.objects.filter(id=department.id, state=True).exists(),
            "El departamento no se eliminó.",
        )
        self.assertEqual(
            response.data["message"],
            "Departamento eliminado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_department_activate(self):
        """
        Prueba la activación de un departamento.
        """
        department = DepartmentFactory(state=False)

        response = self.client.put(f"{self.url}{department.id}/activate/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertTrue(
            Department.objects.filter(id=department.id, state=True).exists(),
            "El departamento no se activó.",
        )
        self.assertEqual(
            response.data["message"],
            "Departamento activado correctamente.",
            "El mensaje de éxito no coincide.",
        )
