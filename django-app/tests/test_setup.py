from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.test import APITestCase

ADMINISTRATIVE = "Administrativo"
DOCTOR = "Médico"
PATIENT = "Paciente"


class TestSetUp(APITestCase):
    """
    Clase de caso de prueba que configura recursos comunes y configuraciones
    para pruebas de API.

    Attributes:
        login_url (str): La URL para iniciar sesión de usuario.
        user (User): El objeto superusuario creado para las pruebas.
        token (str): El token de autenticación obtenido después de iniciar sesión.
    """

    def setUp(self, user_group=ADMINISTRATIVE):
        """
        Configura los recursos y configuraciones necesarios para las pruebas.

        Args:
            user_group (str, optional): El grupo de usuario que se creará para las pruebas.
                Por defecto es ADMINISTRATIVE.

        Returns:
            TestSetUp: El objeto de configuración de prueba.
        """
        from apps.users.models import User

        self.login_url = "/api/login/"

        username = f"testuser_{user_group.lower()}"
        email = f"{username}@test.com"

        self.user = User.objects.create_user(
            name="Test",
            last_name="User",
            username=username,
            password="testpass",
            email=email,
        )

        if user_group == ADMINISTRATIVE:
            self.user.is_staff = True
            self.user.is_superuser = True

        elif user_group == DOCTOR:
            from apps.doctors.models import Doctor

            doctor = Doctor.objects.create(
                user=self.user,
                collegiate_number="123456789",
            )

            self.user.doctor = doctor

        elif user_group == PATIENT:
            from apps.patients.models import Patient

            patient = Patient.objects.create(
                user=self.user,
                dni="12345678A",
                gender="M",
            )

            self.user.patient = patient

        else:
            raise ValueError(f"Grupo no reconocido: {user_group}")

        group, created = Group.objects.get_or_create(name=user_group)
        if created:
            self.user.groups.add(group)

        response = self.client.post(
            self.login_url,
            {
                "username": self.user.username,
                "password": "testpass",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        return super().setUp()
