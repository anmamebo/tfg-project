import functools


def method_permission_classes(classes):
    """
    Función decoradora para establecer clases de permisos en métodos de ViewSets.

    Args:
        classes (list): Lista de clases de permisos que se aplicarán al método.

    Returns:
        function: Función decoradora que establece las clases de permisos para un método específico.

    Esta función toma una lista de clases de permisos y devuelve una función decoradora.
    Esta última, a su vez, aplica las clases de permisos a un método específico en un ViewSet.
    """

    def decorator(func):
        """
        Función decoradora interna que aplica las clases de permisos al método.

        Args:
            func (function): Método al que se aplicarán las clases de permisos.

        Returns:
            function: Función decorada que establece las clases de permisos y verifica los permisos antes de ejecutar el método.

        Esta función decoradora interna toma el método al que se aplicarán las clases de permisos
        y devuelve una función decorada que establece dichas clases y verifica los permisos antes de ejecutar el método.
        """

        # @functools.wrap(func) Permite que el método decorado conserve su nombre y documentación.
        @functools.wraps(func)
        def decorator_func(self, *args, **kwargs):
            """
            Función decorada que establece las clases de permisos y verifica los permisos antes de ejecutar el método.

            Args:
                self: Instancia del ViewSet.
                *args: Argumentos posicionales.
                **kwargs: Argumentos de palabras clave.

            Returns:
                object: Resultado de ejecutar el método con las clases de permisos aplicadas.

            Esta función decorada establece las clases de permisos proporcionadas al método
            y verifica los permisos antes de ejecutar el método con los argumentos proporcionados.
            """
            self.permission_classes = classes
            self.check_permissions(self.request)
            return func(self, *args, **kwargs)

        return decorator_func

    return decorator
