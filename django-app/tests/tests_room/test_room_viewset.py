from uuid import UUID

from apps.rooms.models import Room
from faker import Factory
from rest_framework import status
from tests.factories.department import DepartmentFactory
from tests.factories.room import RoomFactory
from tests.test_setup import TestSetUp

faker = Factory.create()


class RoomTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de salas.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/rooms/"

    def test_room_create(self):
        """
        Prueba la creación de una sala.
        """
        department_id = DepartmentFactory().id
        room_data = {
            "name": faker.name(),
            "description": faker.text(),
            "location": faker.text(max_nb_chars=50),
            "department": department_id,
        }

        response = self.client.post(self.url, room_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(Room.objects.all().count(), 1, "La sala no se creó.")
        self.assertEqual(
            response.data["message"],
            "Sala creada correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_room_create_error(self):
        """
        Prueba la creación de una sala con errores,
        no se envía el nombre
        """
        department_id = DepartmentFactory().id
        room_data = {
            "description": faker.text(),
            "location": faker.text(max_nb_chars=50),
            "department": department_id,
        }

        response = self.client.post(self.url, room_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(Room.objects.all().count(), 0, "La sala se creó.")
        self.assertEqual(
            response.data["message"],
            "Hay errores en la creación.",
            "El mensaje de error no coincide.",
        )

    def test_room_retrieve(self):
        """
        Prueba la obtención de una sala.
        """
        room = RoomFactory()
        response = self.client.get(f"{self.url}{room.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            UUID(response.data["id"]),
            room.id,
            "El id de la sala no coincide.",
        )
        self.assertEqual(
            UUID(response.data["department"]["id"]),
            room.department.id,
            "El id del departamento no coincide.",
        )

    def test_room_retrieve_error(self):
        """
        Prueba la obtención de una sala que no existe.
        """
        invalid_uuid = UUID("00000000-0000-0000-0000-000000000000")
        response = self.client.get(f"{self.url}{invalid_uuid}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET no fue exitosa.",
        )

    def test_room_list(self):
        """
        Prueba la obtención de una lista de salas.
        """
        rooms = RoomFactory.create_batch(5)
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            len(response.data),
            len(rooms),
            "El número de salas no coincide.",
        )
        self.assertCountEqual(
            [entry["id"] for entry in response.data],
            [str(room.id) for room in rooms],
            "Los ids de las salas no coinciden.",
        )

    def test_room_list_filter_by_department(self):
        """
        Prueba la obtención de una lista de salas filtradas por departamento.
        """
        department = DepartmentFactory()
        rooms = RoomFactory.create_batch(5, department=department)
        response = self.client.get(f"{self.url}?search={department.name}")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            len(response.data),
            len(rooms),
            "El número de salas no coincide.",
        )
        self.assertCountEqual(
            [entry["id"] for entry in response.data],
            [str(room.id) for room in rooms],
            "Los ids de las salas no coinciden.",
        )

    def test_room_update(self):
        """
        Prueba la actualización de una sala.
        """
        room = RoomFactory()
        room_data = {
            "name": faker.name(),
            "description": faker.text(),
            "location": faker.text(max_nb_chars=50),
            "department": room.department.id,
        }
        response = self.client.put(f"{self.url}{room.id}/", room_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Sala actualizada correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertEqual(
            Room.objects.get(id=room.id).name,
            room_data["name"],
            "El nombre de la sala no coincide.",
        )

    def test_room_destroy(self):
        """
        Prueba la eliminación de una sala.
        """
        room = RoomFactory()
        response = self.client.delete(f"{self.url}{room.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Sala eliminada correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertFalse(
            Room.objects.get(id=room.id).state,
            "El estado de la sala no coincide.",
        )

    def test_room_activate(self):
        """
        Prueba la activación de una sala.
        """
        room = RoomFactory(state=False)
        response = self.client.put(f"{self.url}{room.id}/activate/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Sala activada correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertTrue(
            Room.objects.get(id=room.id).state,
            "El estado de la sala no coincide.",
        )
