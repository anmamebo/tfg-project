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

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        name = kwargs.get("name", None)
        if name:
            existing_group = Group.objects.filter(name=name).first()
            if existing_group:
                return existing_group

        return super()._create(model_class, *args, **kwargs)
