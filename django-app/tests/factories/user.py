import factory
from apps.users.models import User
from faker import Factory
from tests.factories.group import GroupFactory

faker = Factory.create()


class BaseUserFactory(factory.django.DjangoModelFactory):
    """
    Clase base de fábrica de usuarios.
    """

    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"{faker.first_name()}{n}")
    email = factory.LazyAttribute(lambda obj: f"{obj.username}@example.com")
    password = faker.password()
    name = faker.first_name()
    last_name = faker.last_name()
    is_active = True
    is_staff = False
    is_superuser = False


class AdministrativeUserFactory(BaseUserFactory):
    """
    Clase de fábrica de usuarios administrativos.
    """

    is_staff = True
    is_superuser = True

    @factory.post_generation
    def groups(self, create, extracted, **kwargs):
        """
        Agrega el grupo de administradores al usuario.
        """
        if not create:
            return

        admin_group = GroupFactory(name="Administrativo")
        self.groups.add(admin_group)


class DoctorUserFactory(BaseUserFactory):
    """
    Clase de fábrica de usuarios doctores.
    """

    @factory.post_generation
    def groups(self, create, extracted, **kwargs):
        """
        Agrega el grupo de doctores al usuario.
        """
        if not create:
            return

        doctor_group = GroupFactory(name="Médico")
        self.groups.add(doctor_group)


class PatientUserFactory(BaseUserFactory):
    """
    Clase de fábrica de usuarios pacientes.
    """

    @factory.post_generation
    def groups(self, create, extracted, **kwargs):
        """
        Agrega el grupo de pacientes al usuario.
        """
        if not create:
            return

        patient_group = GroupFactory(name="Paciente")
        self.groups.add(patient_group)
