import factory
from apps.doctors.models import Doctor
from faker import Factory
from tests.factories.group import GroupFactory
from tests.factories.medicalspecialty import MedicalSpecialtyFactory
from tests.factories.user import DoctorUserFactory

faker = Factory.create()


class DoctorFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de Doctor.
    """

    class Meta:
        model = Doctor

    user = factory.SubFactory(DoctorUserFactory)

    @factory.lazy_attribute
    def collegiate_number(self):
        # Generar un número colegiado único
        while True:
            # Generar un nuevo número colegiado
            new_collegiate_number = faker.pystr(min_chars=10, max_chars=10)
            # Verificar si ya existe en la base de datos
            if not Doctor.objects.filter(
                collegiate_number=new_collegiate_number
            ).exists():
                return new_collegiate_number

    @factory.post_generation
    def medical_specialties(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for medical_specialty in extracted:
                self.medical_specialties.add(medical_specialty)

    @factory.post_generation
    def departments(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for department in extracted:
                self.departments.add(department)
