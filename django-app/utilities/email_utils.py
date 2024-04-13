from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


class EmailService:
    def __init__(self):
        self.sender_email = settings.EMAIL_HOST_USER

    def send_email(self, subject, template_name, recipient_list, context):
        """
        Envía un correo electrónico a la lista de destinatarios con el contenido del template_name.

        Args:
            subject (str): Asunto del correo electrónico.
            template_name (str): Nombre del template que se usará para el contenido del correo electrónico.
            recipient_list (list): Lista de destinatarios del correo electrónico.
            context (dict): Diccionario con las variables que se usarán en el template.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        try:
            email_content = render_to_string(f"emails/{template_name}.html", context)

            send_mail(
                subject,
                email_content,
                self.sender_email,
                recipient_list,
                html_message=email_content,
                fail_silently=False,
            )

            return True

        except Exception as e:
            print(f"Error al enviar el correo electrónico: {str(e)}")
            return False

    def send_welcome_email(self, user, password):
        """
        Envía un correo electrónico de bienvenida al usuario con su nombre de usuario y contraseña.

        Args:
            user (User): Usuario al que se le enviará el correo electrónico.
            password (str): Contraseña del usuario.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        subject = "Bienvenido/a a la aplicación de citas médicas HospitalSys"
        template_name = "welcome_email_template"
        recipient_list = [user.email]
        context = {
            "name": user.name,
            "last_name": user.last_name,
            "username": user.username,
            "password": password,
        }
        return self.send_email(subject, template_name, recipient_list, context)

    def send_welcome_signup_email(self, user):
        """
        Envía un correo electrónico de bienvenida al usuario que se ha registrado con su nombre de usuario.

        Args:
            user (User): Usuario al que se le enviará el correo electrónico.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        subject = "Bienvenido/a a la aplicación de citas médicas HospitalSys"
        template_name = "welcome_email_signup_template"
        recipient_list = [user.email]
        context = {
            "name": user.name,
            "last_name": user.last_name,
            "username": user.username,
        }
        return self.send_email(subject, template_name, recipient_list, context)

    def send_reset_password_email(self, user, url):
        """
        Envía un correo electrónico al usuario con el enlace para restablecer su contraseña.

        Args:
            user (User): Usuario al que se le enviará el correo electrónico.
            url (str): Enlace que el usuario debe seguir para restablecer su contraseña.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        subject = "Restablecer contraseña HospitalSys"
        template_name = "reset_password_email_template"
        recipient_list = [user.email]
        context = {
            "name": user.name,
            "url": url,
        }
        return self.send_email(subject, template_name, recipient_list, context)

    def send_success_password_reset_email(self, user):
        """
        Envía un correo electrónico al usuario para notificarle que su contraseña se restableció correctamente.

        Args:
            user (User): Usuario al que se le enviará el correo electrónico.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        subject = "Contraseña restablecida correctamente HospitalSys"
        template_name = "success_password_reset_email_template"
        recipient_list = [user.email]
        context = {
            "name": user.name,
        }
        return self.send_email(subject, template_name, recipient_list, context)

    def send_success_account_activation_email(self, user):
        """
        Envía un correo electrónico al usuario para notificarle que su cuenta se activó correctamente.

        Args:
            user (User): Usuario al que se le enviará el correo electrónico.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        subject = "Cuenta activada correctamente HospitalSys"
        template_name = "success_account_activation_email_template"
        recipient_list = [user.email]
        context = {
            "name": user.name,
        }
        return self.send_email(subject, template_name, recipient_list, context)

    def send_appointment_assigned_email(self, appointment, url):
        """
        Envía un correo electrónico al paciente para notificarle que se le ha asignado una cita médica.

        Args:
            appointment (Appointment): Cita médica que se le ha asignado al paciente.
            url (str): URL para crear un evento en Google Calendar con la información de la cita médica.

        Returns:
            bool: True si el correo electrónico se envió correctamente, False en caso contrario.
        """
        subject = "Confirmación de cita médica programada HospitalSys"
        template_name = "appointment_assigned_email_template"
        recipient_list = [appointment.patient.user.email]
        context = {
            "url": url,
            "name": appointment.patient.user.name,
            "request_date": appointment.request_date.strftime("%d/%m/%Y %H:%M"),
            "doctor_name": f"{appointment.doctor.user.name} {appointment.doctor.user.last_name}",
            "specialty": appointment.specialty.name,
            "date": appointment.schedule.start_time.strftime("%d/%m/%Y %H:%M"),
            "location": f"{appointment.room.name} ({appointment.room.location}) - {appointment.room.department.name}",
        }
        return self.send_email(subject, template_name, recipient_list, context)
