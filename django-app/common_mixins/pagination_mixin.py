from rest_framework import status
from rest_framework.response import Response


class PaginationMixin:
    """
    Mixin para paginar un queryset y retornar una respuesta paginada
    o no paginada dependiendo del parametro paginate en la url.
    """

    def conditional_paginated_response(self, queryset, serializer_class):
        """
        Metodo para paginar un queryset y retornar una respuesta paginada
        o no paginada dependiendo del parametro paginate en la url.

        Args:
            queryset (QuerySet): Queryset a paginar.
            serializer_class (Serializer): Serializer para serializar el queryset.
            request (Request): Request de la vista.

        Returns:
            Response: Respuesta paginada o no paginada.
        """
        paginate_param = self.request.query_params.get("paginate", None)

        if paginate_param and paginate_param.lower() == "true":
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)

        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
