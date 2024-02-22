from urllib.parse import quote


def build_appointment_url(appointment):
    """
    Construye la URL para crear un evento en Google Calendar con la información de la cita médica.

    Args:
        appointment (Appointment): Cita médica para la que se generará la URL.

    Returns:
        str: URL para crear un evento en Google Calendar con la información de la cita médica.
    """
    appointment_txt = f"Cita médica con Dr./Dra. {appointment.doctor.user.name} {appointment.doctor.user.last_name}"
    appointment_description = f"{appointment_txt}\nEspecialidad: {appointment.specialty.name}\nMotivo: {appointment.reason}\nFecha: {appointment.schedule.start_time} - {appointment.schedule.end_time}\nUbicación: {appointment.room.name} ({appointment.room.location}) - {appointment.room.department.name}"
    start_date = appointment.schedule.start_time.strftime("%Y%m%dT%H%M%S")
    end_date = appointment.schedule.end_time.strftime("%Y%m%dT%H%M%S")

    encoded_description = quote(appointment_description, safe="")

    url = f"https://calendar.google.com/calendar/render?action=TEMPLATE&text={quote(appointment_txt)}&details={encoded_description}&dates={start_date}/{end_date}&ctz=Europe/Madrid"

    return url
