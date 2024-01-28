import factory
from apps.rooms.models import Room
from faker import Factory
from tests.factories.department import DepartmentFactory

faker = Factory.create()


class RoomFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de Room.
    """

    class Meta:
        model = Room

    name = factory.Sequence(lambda n: f"{faker.name()} {n}")
    description = faker.text()
    location = faker.text(max_nb_chars=50)
    department = factory.SubFactory(DepartmentFactory)
