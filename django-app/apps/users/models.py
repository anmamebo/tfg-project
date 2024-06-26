import os
import uuid

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import FileExtensionValidator
from django.db import models
from utilities.validators import FileSizeValidator

ALLOWED_EXTENSIONS = [
    "jpg",
    "jpeg",
    "png",
    "svg",
]

MAX_FILE_SIZE_MB = 5


def user_directory_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join("profile_pictures", str(instance.id), filename)


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
    profile_picture = models.ImageField(
        upload_to=user_directory_path,
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=ALLOWED_EXTENSIONS),
            FileSizeValidator(max_size_mb=MAX_FILE_SIZE_MB),
        ],
    )
    username = models.CharField(
        verbose_name="Nombre de usuario", unique=True, max_length=255
    )
    email = models.CharField(
        verbose_name="Correo Electrónico", unique=True, max_length=255
    )
    name = models.CharField(verbose_name="Nombre", max_length=255)
    last_name = models.CharField(verbose_name="Apellidos", max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    reset_password_token = models.CharField(max_length=255, blank=True, null=True)
    objects = UserManager()

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name", "last_name"]

    def __str__(self):
        return f"{self.name} {self.last_name} ({self.username}) - {self.email}"
