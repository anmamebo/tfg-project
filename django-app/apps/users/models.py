import uuid

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)

from simple_history.models import HistoricalRecords


class UserManager(BaseUserManager):
    def _create_user(
        self,
        username,
        email,
        name,
        last_name,
        password,
        is_staff,
        is_superuser,
        **extra_fields,
    ):
        user = self.model(
            username=username,
            email=email,
            name=name,
            last_name=last_name,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(
        self, username, email, name, last_name, password=None, **extra_fields
    ):
        return self._create_user(
            username, email, name, last_name, password, False, False, **extra_fields
        )

    def create_superuser(
        self, username, email, name, last_name, password=None, **extra_fields
    ):
        return self._create_user(
            username, email, name, last_name, password, True, True, **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(
        verbose_name="Nombre de usuario", unique=True, max_length=255
    )
    email = models.CharField(
        verbose_name="Correo Electrónico", unique=True, max_length=255
    )
    name = models.CharField(
        verbose_name="Nombre", max_length=255, blank=True, null=True
    )
    last_name = models.CharField(
        verbose_name="Apellidos", max_length=255, blank=True, null=True
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    historical = HistoricalRecords()
    objects = UserManager()

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        default_permissions = ()
        permissions = [
            ("list_user", "Can list user"),
            ("get_user", "Can get user"),
            ("add_user", "Can add user"),
            ("change_user", "Can change user"),
            ("delete_user", "Can delete user"),
        ]

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name", "last_name"]

    def __str__(self):
        return f"{self.name} {self.last_name} ({self.username}) - {self.email}"
