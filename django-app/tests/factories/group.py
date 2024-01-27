import factory
from django.contrib.auth.models import Group
from faker import Factory

faker = Factory.create()


class GroupFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de Room.
    """

    class Meta:
        model = Group

    name = factory.Sequence(lambda n: f"{faker.name()} {n}")
