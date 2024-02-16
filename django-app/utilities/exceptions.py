class SchedulingError(Exception):
    def __init__(
        self,
        message,
        original_exception=None,
    ):
        super().__init__(message)
        self.original_exception = original_exception

    def __str__(self):
        if self.original_exception:
            return f"{self.args[0]} - Error: {str(self.original_exception)}"
        else:
            return f"{self.args[0]}"
