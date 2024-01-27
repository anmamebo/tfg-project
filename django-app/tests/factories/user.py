import factory
from apps.users.models import User
from faker import Factory

faker = Factory.create()


class UserFactory(factory.django.DjangoModelFactory):
    """
    Clase de fábrica para crear instancias de User.
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

    @factory.post_generation
    def groups(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for group in extracted:
                self.groups.add(group)
