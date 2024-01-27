from uuid import UUID

from apps.users.models import User
from faker import Factory
from rest_framework import status
from tests.factories.user import UserFactory
from tests.test_setup import TestSetUp

faker = Factory.create()


class UserTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de usuarios.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/users/users/"

    def test_user_create(self):
        """
        Prueba la creación de un usuario.
        """
        user_data = {
            "username": faker.name(),
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }
        response = self.client.post(self.url, user_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(
            User.objects.all().count(), 2, "El usuario no se creó."
        )  # 2 porque ya se crea un usuario en el setup
        self.assertEqual(
            response.data["message"],
            "Usuario registrado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_user_create_error(self):
        """
        Prueba la creación de un usuario con errores,
        el nombre de usuario coincide con el de otro usuario.
        """
        user_data = {
            "username": self.user.username,
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }
        response = self.client.post(self.url, user_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            "La solicitud POST fue exitosa.",
        )
        self.assertEqual(User.objects.all().count(), 1, "El usuario se creó.")
        self.assertEqual(
            response.data["message"],
            "Hay errores en el registro",
            "El mensaje de error no coincide.",
        )

    def test_user_retrieve(self):
        """
        Prueba la obtención de un usuario.
        """
        user = UserFactory()
        response = self.client.get(f"{self.url}{user.id}/")

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            response.data["username"],
            user.username,
            "El nombre de usuario no coincide.",
        )

    def test_user_retrieve_error(self):
        """
        Prueba la obtención de un usuario con errores,
        el identificador no es un UUID válido.
        """
        invalid_uuid = UUID("00000000-0000-0000-0000-000000000000")
        response = self.client.get(f"{self.url}{invalid_uuid}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET fue exitosa.",
        )

    def test_user_list(self):
        """
        Prueba la obtención de una lista de usuarios.
        """
        users = UserFactory.create_batch(5)
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            len(users) + 1,
            "El número de usuarios no coincide.",
        )  # + 1 porque ya se crea un usuario en el setup

    def test_user_update(self):
        """
        Prueba la actualización de un usuario.
        """
        user_data = {
            "username": faker.name(),
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }
        response = self.client.put(f"{self.url}{self.user.id}/", user_data)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Usuario actualizado correctamente",
            "El mensaje de éxito no coincide.",
        )

    def test_user_destroy(self):
        """
        Prueba la eliminación de un usuario.
        """
        user = UserFactory()
        response = self.client.delete(f"{self.url}{user.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Usuario eliminado correctamente",
            "El mensaje de éxito no coincide.",
        )
        self.assertFalse(
            User.objects.get(id=user.id).is_active, "El usuario no se eliminó."
        )
