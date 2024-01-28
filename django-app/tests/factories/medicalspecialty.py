import factory
from apps.medicalspecialties.models import MedicalSpecialty
from faker import Factory

faker = Factory.create()


class MedicalSpecialtyFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de MedicalSpecialty.
    """

    class Meta:
        model = MedicalSpecialty

    name = factory.Sequence(lambda n: f"{faker.name()} {n}")
    description = faker.text()
