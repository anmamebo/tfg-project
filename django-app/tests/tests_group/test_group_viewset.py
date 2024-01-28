from django.contrib.auth.models import Group
from faker import Factory
from rest_framework import status
from tests.factories.group import GroupFactory
from tests.test_setup import PATIENT, TestSetUp

faker = Factory.create()


class GroupTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de grupos.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/groups/"

    def test_group_create(self):
        """
        Prueba la creación de un grupo.
        """
        group_data = {
            "name": faker.name(),
        }
        response = self.client.post(self.url, group_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(
            Group.objects.all().count(), 2, "El grupo no se creó."
        )  # 2 porque ya se crea un grupo en el setup
        self.assertEqual(
            response.data["message"],
            "Grupo creado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_group_create_error(self):
        """
        Prueba la creación de un grupo con errores,
        ya que un paciente no puede crear un grupo.
        """
        self.setUp(user_group=PATIENT)

        group_data = {
            "name": faker.name(),
        }
        response = self.client.post(self.url, group_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(
            Group.objects.all().count(), 2, "El grupo se creó."
        )  # 2 porque ya se crea un grupo en el setup y otro en el setup de paciente

    def test_group_retrieve(self):
        """
        Prueba la recuperación de un grupo.
        """
        group = GroupFactory()
        response = self.client.get(f"{self.url}{group.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            response.data["name"],
            group.name,
            "El nombre del grupo no coincide.",
        )

    def test_group_retrieve_error(self):
        """
        Prueba la recuperación de un grupo que no existe.
        """
        response = self.client.get(f"{self.url}100/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET fue exitosa.",
        )

    def test_group_list(self):
        """
        Prueba la recuperación de todos los grupos.
        """
        groups = GroupFactory.create_batch(5)
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            len(response.data),
            len(groups) + 1,
            "El número de grupos no coincide.",
        )  # + 1 porque ya se crea un grupo en el setup

    def test_group_update(self):
        """
        Prueba la actualización de un grupo.
        """
        group_data = {
            "name": faker.name(),
        }
        group = GroupFactory()
        response = self.client.put(f"{self.url}{group.id}/", group_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Grupo actualizado correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertEqual(
            Group.objects.get(id=group.id).name,
            group_data["name"],
            "El nombre del grupo no coincide.",
        )

    def test_group_destroy(self):
        """
        Prueba la eliminación de un grupo.
        """
        group = GroupFactory()
        response = self.client.delete(f"{self.url}{group.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Grupo eliminado correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertEqual(
            Group.objects.all().count(), 1, "El grupo no se eliminó."
        )  # 1 porque ya se crea un grupo en el setup
