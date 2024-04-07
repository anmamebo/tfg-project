import factory
from apps.patients.models import Patient
from faker import Factory
from tests.factories.user import PatientUserFactory

faker = Factory.create()


class PatientFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de Patient.
    """

    class Meta:
        model = Patient

    user = factory.SubFactory(PatientUserFactory)

    @factory.lazy_attribute
    def dni(self):
        # Generar un número de DNI único
        while True:
            # Generar un nuevo número de DNI
            new_dni = faker.random_number(digits=9)
            # Verificar si ya existe en la base de datos
            if not Patient.objects.filter(dni=new_dni).exists():
                return new_dni

    birthdate = faker.date_of_birth()
    gender = faker.random_element(elements=("M", "F"))
    phone = faker.phone_number()

    @factory.lazy_attribute
    def social_security(self):
        # Generar un número de seguridad social único
        while True:
            # Generar un nuevo número de seguridad social
            new_social_security = faker.random_number(digits=11)
            # Verificar si ya existe en la base de datos
            if not Patient.objects.filter(social_security=new_social_security).exists():
                return new_social_security

    nationality = faker.country()
