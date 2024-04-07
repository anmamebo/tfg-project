from uuid import UUID

from apps.patients.models import Patient
from faker import Factory
from rest_framework import status
from tests.factories.patient import PatientFactory
from tests.test_setup import TestSetUp

faker = Factory.create()


class PatientTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de pacientes.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/patients/"

    def test_patient_create(self):
        """
        Prueba la creación de un paciente
        """
        user_data = {
            "username": faker.name(),
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }

        patient_data = {
            "user": user_data,
            "dni": faker.random_number(digits=9),
            "birthdate": faker.date_of_birth(),
            "gender": faker.random_element(elements=("M", "F")),
            "phone": faker.phone_number(),
            "social_security": faker.random_number(digits=11),
            "nationality": faker.country(),
        }

        response = self.client.post(self.url, patient_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(Patient.objects.all().count(), 1, "El paciente no se creó.")
        self.assertEqual(
            response.data["message"],
            "Paciente creado correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_patient_create_error(self):
        """
        Prueba la creación de un paciente con errores,
        la información de usuario no ha sido enviada.
        """
        patient_data = {
            "dni": faker.random_number(digits=9),
            "birthdate": faker.date_of_birth(),
            "gender": faker.random_element(elements=("M", "F")),
            "phone": faker.phone_number(),
            "social_security": faker.random_number(digits=11),
            "nationality": faker.country(),
        }
        response = self.client.post(self.url, patient_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            "La solicitud POST fue exitosa.",
        )
        self.assertEqual(Patient.objects.all().count(), 0, "El paciente se creó.")
        self.assertEqual(
            response.data["message"],
            "No se ha enviado los datos del paciente",
            "El mensaje de error no coincide.",
        )

    def test_patient_retrieve(self):
        """
        Prueba la recuperación de un paciente.
        """
        patient = PatientFactory()
        response = self.client.get(f"{self.url}{patient.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud GET no fue exitosa.",
        )
        self.assertEqual(
            response.data["id"],
            str(patient.id),
            "El ID del paciente no coincide.",
        )
        self.assertEqual(
            response.data["user"]["username"],
            patient.user.username,
            "El nombre de usuario no coincide.",
        )

    def test_patient_retrieve_error(self):
        """
        Prueba la obtención de un paciente con errores,
        el identificador no es un UUID válido.
        """
        invalid_uuid = UUID("00000000-0000-0000-0000-000000000000")
        response = self.client.get(f"{self.url}{invalid_uuid}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET fue exitosa.",
        )

    def test_patient_list(self):
        """
        Prueba la obtención de una lista de pacientes.
        """
        patients = PatientFactory.create_batch(5)
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            len(patients),
            "El número de pacientes no coincide.",
        )

    def test_patient_update(self):
        """
        Prueba la actualización de un paciente.
        """
        patient = PatientFactory()
        user_data = {
            "username": faker.name(),
            "email": faker.email(),
            "password": faker.password(),
            "name": faker.first_name(),
            "last_name": faker.last_name(),
        }
        patient_data = {
            "user": user_data,
            "dni": faker.random_number(digits=9),
            "birthdate": faker.date_of_birth(),
            "gender": faker.random_element(elements=("M", "F")),
            "phone": faker.phone_number(),
            "social_security": faker.random_number(digits=11),
            "nationality": faker.country(),
        }

        response = self.client.put(
            f"{self.url}{patient.id}/", patient_data, format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Paciente actualizado correctamente",
            "El mensaje de éxito no coincide.",
        )

    def test_patient_destroy(self):
        """
        Prueba la eliminación de un paciente.
        """
        patient = PatientFactory()
        response = self.client.delete(f"{self.url}{patient.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Paciente eliminado correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertFalse(
            Patient.objects.get(id=patient.id).state,
            "El estado del paciente no coincide.",
        )

    def test_patient_activate(self):
        """
        Prueba la activación de un paciente.
        """
        patient = PatientFactory(state=False)
        response = self.client.put(f"{self.url}{patient.id}/activate/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            response.data["message"],
            "Paciente activado correctamente.",
            "El mensaje de éxito no coincide.",
        )
        self.assertTrue(
            Patient.objects.get(id=patient.id).state,
            "El estado del paciente no coincide.",
        )
