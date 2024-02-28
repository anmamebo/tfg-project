from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _


@deconstructible
class FileSizeValidator:
    """
    Validador de tamaño de archivo.

    Raises:
        ValidationError: Si el tamaño del archivo es mayor al permitido.
    """

    message = _("The maximum file size is %(max_size)s MB.")
    code = "invalid_size"

    def __init__(self, max_size_mb=5, message=None, code=None):
        self.max_size_mb = max_size_mb * 1024 * 1024
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code

    def __call__(self, value):
        filesize = value.size
        if self.max_size_mb is not None and filesize > self.max_size_mb:
            raise ValidationError(
                self.message,
                code=self.code,
                params={"max_size": self.max_size_mb / 1024 / 1024},
            )

    def __eq__(self, other):
        return (
            isinstance(other, FileSizeValidator)
            and self.max_size_mb == other.max_size_mb
            and self.message == other.message
            and self.code == other.code
        )

    # max_size_bytes = max_size_mb * 1024 * 1024
    # filesize = value.size

    # if filesize > max_size_bytes:
    #     raise ValidationError(
    #         _("El tamaño máximo de la imagen es de %(max_size)s MB."),
    #         code="invalid_size",
    #         params={"max_size": max_size_mb},
    #     )
