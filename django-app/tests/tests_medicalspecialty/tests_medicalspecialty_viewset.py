from uuid import UUID

from apps.medicalspecialties.models import MedicalSpecialty
from faker import Factory
from rest_framework import status
from tests.factories.medicalspecialty import MedicalSpecialtyFactory
from tests.test_setup import PATIENT, TestSetUp

faker = Factory.create()


class MedicalSpecialtyTestCase(TestSetUp):
    """
    Clase de caso de prueba que contiene las pruebas de la vista de especialidad médica.

    Args:
        TestSetUp (APITestCase): Clase de configuración de prueba.
    """

    url = "/api/medicalspecialties/medicalspecialties/"

    def test_medicalspecialty_create(self):
        """
        Prueba la creación de una especialidad médica.
        """
        medicalspecialty_data = {
            "name": faker.name(),
            "description": faker.text(),
        }
        response = self.client.post(self.url, medicalspecialty_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "La solicitud POST no fue exitosa.",
        )
        self.assertEqual(
            MedicalSpecialty.objects.all().count(),
            1,
            "La especialidad médica no se creó.",
        )
        self.assertEqual(
            response.data["message"],
            "Especialidad médica creada correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_medicalspecialty_create_error(self):
        """
        Prueba la creación de una especialidad médica con errores,
        ya que un paciente no puede crear una especialidad médica.
        """
        self.setUp(user_group=PATIENT)

        medicalspecialty_data = {
            "name": faker.name(),
            "description": faker.text(),
        }
        response = self.client.post(self.url, medicalspecialty_data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            "El usuario ha accedido a un recurso que no tiene permitido.",
        )
        self.assertEqual(
            MedicalSpecialty.objects.all().count(), 0, "La especialidad médica se creó."
        )

    def test_medicalspecialty_retrieve(self):
        """
        Prueba la obtención de una especialidad médica.
        """
        medicalspecialty = MedicalSpecialtyFactory()
        response = self.client.get(f"{self.url}{medicalspecialty.id}/")

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            response.data["name"],
            medicalspecialty.name,
            "El nombre de la especialida médica no coincide.",
        )
        self.assertEqual(
            response.data["description"],
            medicalspecialty.description,
            "La descripción de la especialidad médica no coincide.",
        )

    def test_medicalspecialty_retrieve_error(self):
        """
        Prueba la obtención de una especialidad médica que no existe.
        """
        invalid_uuid = UUID("00000000-0000-0000-0000-000000000000")
        response = self.client.get(f"{self.url}{invalid_uuid}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "La solicitud GET no fue exitosa.",
        )

    def test_medicalspecialty_list(self):
        """
        Prueba la obtención de todas las especialidades médicas.
        """
        medicalspecialties = MedicalSpecialtyFactory.create_batch(5)
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            len(medicalspecialties),
            "La longitud de la respuesta no coincide con la cantidad de especialidades médicas creadas",
        )
        self.assertCountEqual(
            [entry["name"] for entry in response.data],
            [medicalspecialty.name for medicalspecialty in medicalspecialties],
            "Los nombres de las especialidades médicas no coinciden.",
        )

    def test_medicalspecialty_list_filter(self):
        """
        Prueba la obtención de todas las especialidades médicas filtradas por nombre.
        """
        medicalspecialties = MedicalSpecialtyFactory.create_batch(5)

        response = self.client.get(f"{self.url}?search={medicalspecialties[0].name}")

        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "La solicitud GET no fue exitosa."
        )
        self.assertEqual(
            len(response.data),
            1,
            "La longitud de la respuesta no coincide con la cantidad de especialidades médicas creadas",
        )
        self.assertEqual(
            response.data[0]["name"],
            medicalspecialties[0].name,
            "El nombre de la especialidad médica no coincide.",
        )

    def test_medicalspecialty_update(self):
        """
        Prueba la actualización de una especialidad médica.
        """
        medicalspecialty = MedicalSpecialtyFactory()

        medicalspecialty_data = {
            "name": faker.name(),
            "description": faker.text(),
        }

        response = self.client.put(
            f"{self.url}{medicalspecialty.id}/", medicalspecialty_data, format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertEqual(
            MedicalSpecialty.objects.all().count(),
            1,
            "La especialidad médica no se actualizó.",
        )
        self.assertEqual(
            response.data["message"],
            "Especialidad médica actualizada correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_medicalspecialty_destroy(self):
        """
        Prueba la eliminación de una especialidad médica.
        """
        medicalspecialty = MedicalSpecialtyFactory()

        response = self.client.delete(f"{self.url}{medicalspecialty.id}/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud DELETE no fue exitosa.",
        )
        self.assertFalse(
            MedicalSpecialty.objects.filter(
                id=medicalspecialty.id, state=True
            ).exists(),
            "La especialidad médica no se eliminó.",
        )
        self.assertEqual(
            response.data["message"],
            "Especialidad médica eliminada correctamente.",
            "El mensaje de éxito no coincide.",
        )

    def test_medicalspecialty_activate(self):
        """
        Prueba la activación de una especialidad médica.
        """
        medicalspecialty = MedicalSpecialtyFactory(state=False)

        response = self.client.put(f"{self.url}{medicalspecialty.id}/activate/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "La solicitud PUT no fue exitosa.",
        )
        self.assertTrue(
            MedicalSpecialty.objects.filter(
                id=medicalspecialty.id, state=True
            ).exists(),
            "La especialidad médica no se activó.",
        )
        self.assertEqual(
            response.data["message"],
            "Especialidad médica activada correctamente.",
            "El mensaje de éxito no coincide.",
        )
