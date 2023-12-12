from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_welcome_email(user, password):
    email_content = render_to_string(
        "emails/welcome_email_template.html",
        {
            "name": user.name,
            "last_name": user.last_name,
            "username": user.username,
            "password": password,
        },
    )

    send_mail(
        "Bienvenido/a a la aplicación de citas médicas HospitalSys",
        email_content,
        settings.EMAIL_HOST_USER,
        [user.email],
        html_message=email_content,
        fail_silently=False,
    )
