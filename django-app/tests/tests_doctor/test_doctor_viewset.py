from uuid import UUID

from apps.doctors.models import Doctor
from faker import Factory
from rest_framework import status
from tests.factories.doctor import DoctorFactory
from tests.test_setup import TestSetUp

faker = Factory.create()


class DoctorTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de médicos.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/doctors/"

    def test_doctor_create(self):
        """
        Prueba la creación de un médico
        """
        user_data = {
            "username": faker.name(),
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }

        doctor_data = {"user": user_data, "collegiate_number": "2332432"}

        response = self.client.post(self.url, doctor_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(Doctor.objects.all().count(), 1, "El médico no se creó.")
        self.assertEqual(
            response.data["message"],
            "Médico creado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_doctor_create_error(self):
        """
        Prueba la creación de un médico con errores,
        la información de usuario no ha sido enviada.
        """
        doctor_data = {"collegiate_number": "2332432"}
        response = self.client.post(self.url, doctor_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            "La solicitud POST fue exitosa.",
        )
        self.assertEqual(Doctor.objects.all().count(), 0, "El usuario se creó.")
        self.assertEqual(
            response.data["message"],
            "No se ha enviado los datos del usuario",
            "El mensaje de error no coincide.",
        )

    def test_doctor_retrieve(self):
        """
        Prueba la recuperación de un médico.
        """
        doctor = DoctorFactory()
        response = self.client.get(f"{self.url}{doctor.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            response.data["id"],
            str(doctor.id),
            "El ID del médico no coincide.",
        )
        self.assertEqual(
            response.data["user"]["username"],
            doctor.user.username,
            "El nombre de usuario no coincide.",
        )

    def test_doctor_retrieve_error(self):
        """
        Prueba la obtención de un médico con errores,
        el identificador no es un UUID válido.
        """
        invalid_uuid = UUID("00000000-0000-0000-0000-000000000000")
        response = self.client.get(f"{self.url}{invalid_uuid}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET fue exitosa.",
        )

    def test_doctor_list(self):
        """
        Prueba la obtención de una lista de médicos.
        """
        doctors = DoctorFactory.create_batch(5)
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            len(doctors),
            "El número de médicos no coincide.",
        )

    def test_doctor_update(self):
        """
        Prueba la actualización de un médico.
        """
        doctor = DoctorFactory()
        user_data = {
            "username": faker.name(),
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }
        doctor_data = {"user": user_data, "collegiate_number": "2332432"}

        response = self.client.put(
            f"{self.url}{doctor.id}/", doctor_data, format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Médico actualizado correctamente",
            "El mensaje de éxito no coincide.",
        )

    def test_doctor_destroy(self):
        """
        Prueba la eliminación de un médico.
        """
        doctor = DoctorFactory()
        response = self.client.delete(f"{self.url}{doctor.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Médico eliminado correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertFalse(
            Doctor.objects.get(id=doctor.id).state,
            "El estado del médico no coincide.",
        )

    def test_doctor_activate(self):
        """
        Prueba la activación de un médico.
        """
        doctor = DoctorFactory(state=False)
        response = self.client.put(f"{self.url}{doctor.id}/activate/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Médico activado correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertTrue(
            Doctor.objects.get(id=doctor.id).state,
            "El estado del médico no coincide.",
        )
