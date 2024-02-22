from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_email(subject, template_name, recipient_list, context):
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
            settings.EMAIL_HOST_USER,
            recipient_list,
            html_message=email_content,
            fail_silently=False,
        )

        return True

    except Exception as e:
        print(f"Error al enviar el correo electrónico: {str(e)}")
        return False


def send_welcome_email(user, password):
    """
    Envía un correo electrónico de bienvenida al usuario con su nombre de usuario y contraseña.

    Args:
        user (User): Usuario al que se le enviará el correo electrónico.
        password (str): Contraseña del usuario.

    Returns:
        bool: True si el correo electrónico se envió correctamente, False en caso contrario.
    """
    return send_email(
        "Bienvenido/a a la aplicación de citas médicas HospitalSys",
        "welcome_email_template",
        [user.email],
        {
            "name": user.name,
            "last_name": user.last_name,
            "username": user.username,
            "password": password,
        },
    )


def send_reset_password_email(user, url):
    """
    Envía un correo electrónico al usuario con el enlace para restablecer su contraseña.

    Args:
        user (User): Usuario al que se le enviará el correo electrónico.
        url (str): Enlace que el usuario debe seguir para restablecer su contraseña.

    Returns:
        bool: True si el correo electrónico se envió correctamente, False en caso contrario.
    """
    return send_email(
        "Restablecer contraseña HospitalSys",
        "reset_password_email_template",
        [user.email],
        {
            "name": user.name,
            "url": url,
        },
    )


def send_success_password_reset_email(user):
    """
    Envía un correo electrónico al usuario para notificarle que su contraseña se restableció correctamente.

    Args:
        user (User): Usuario al que se le enviará el correo electrónico.

    Returns:
        bool: True si el correo electrónico se envió correctamente, False en caso contrario.
    """
    return send_email(
        "Contraseña restablecida correctamente HospitalSys",
        "success_password_reset_email_template",
        [user.email],
        {
            "name": user.name,
        },
    )


def send_appointment_assigned_email(appointment, url):
    """
    Envía un correo electrónico al paciente para notificarle que se le ha asignado una cita médica.

    Args:
        appointment (Appointment): Cita médica que se le ha asignado al paciente.
        url (str): URL para crear un evento en Google Calendar con la información de la cita médica.

    Returns:
        bool: True si el correo electrónico se envió correctamente, False en caso contrario.
    """
    return send_email(
        "Confirmación de cita médica programada HospitalSys",
        "appointment_assigned_email_template",
        [appointment.patient.user.email],
        {
            "url": url,
            "name": appointment.patient.user.name,
            "request_date": appointment.request_date.strftime("%d/%m/%Y %H:%M"),
            "doctor_name": f"{appointment.doctor.user.name} {appointment.doctor.user.last_name}",
            "specialty": appointment.specialty.name,
            "date": appointment.schedule.start_time.strftime("%d/%m/%Y %H:%M"),
            "location": f"{appointment.room.name} ({appointment.room.location}) - {appointment.room.department.name}",
        },
    )
