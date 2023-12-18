from rest_framework import status
from rest_framework.response import Response


class ErrorResponseMixin:
    """
    Mixin para retornar una respuesta de error.
    """

    def error_response(
        self, message, errors=None, status_code=status.HTTP_400_BAD_REQUEST
    ):
        """
        Metodo para retornar una respuesta de error.

        Args:
            message (str): Mensaje de error.
            errors (dict, optional): Errores. Defaults to None.
            status_code (int): Codigo de estado de la respuesta.

        Returns:
            Response: Respuesta de error.
        """
        response_data = {"message": message}
        if errors:
            response_data["errors"] = errors

        return Response(response_data, status=status_code)
