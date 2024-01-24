import factory
from apps.departments.models import Department
from faker import Factory

faker = Factory.create()


class DepartmentFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de Department.
    """

    class Meta:
        model = Department

    name = factory.Sequence(lambda n: f"{faker.name()} {n}")
    description = faker.text()
