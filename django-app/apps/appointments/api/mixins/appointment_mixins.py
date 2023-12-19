from datetime import datetime
from io import BytesIO

from django.http import FileResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


class GeneratePDFMixin:
    """
    Mixin para generar un PDF de la cita.
    """

    def generate_pdf(self, appointment):
        """
        Metodo para generar un PDF de la cita.

        Args:
            appointment (Appointment): Cita a generar el PDF.

        Returns:
            FileResponse: Archivo PDF.
        """
        buffer = BytesIO()
        pdf_canvas = canvas.Canvas(buffer, pagesize=A4)

        title_style = ("Helvetica-Bold", 16)
        subtitle_style = ("Helvetica-Bold", 12)
        normal_style = ("Helvetica", 12)

        w, h = A4
        x = 50
        y = 800
        line_height = 18

        # Fecha de generación del PDF
        pdf_canvas.setFont(*normal_style)
        pdf_canvas.drawCentredString(w / 2, y, self.generate_created_date())
        y -= line_height * 4

        # Encabezado del PDF
        pdf_canvas.setFont(*title_style)
        pdf_canvas.drawString(x, y, "Informe de Cita Médica")
        y -= line_height * 2

        if appointment.schedule and appointment.schedule.start_time:
            date_str = appointment.schedule.start_time.strftime("%H:%M - %d/%m/%Y")
            pdf_canvas.setFont(*subtitle_style)
            pdf_canvas.drawString(
                x,
                y,
                f"Fecha de la cita: {date_str}",
            )
            y -= line_height * 3

        # Detalles de la cita
        appointment_details = self.generate_appointment_details(appointment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in appointment_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        y -= line_height * 3

        # Detalles del médico
        doctor_details = self.generate_doctor_details(appointment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles del Médico:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in doctor_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        y -= line_height * 3

        # Detalles del paciente
        patient_details = self.generate_patient_details(appointment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles del Paciente:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in patient_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        pdf_canvas.showPage()  # Guardar página actual y crear una nueva
        self.set_pdf_metadata(pdf_canvas, appointment)
        pdf_canvas.save()

        buffer.seek(0)
        return FileResponse(
            buffer, as_attachment=True, filename=self.generate_pdf_name(appointment)
        )

    def generate_pdf_name(self, appointment):
        """
        Metodo para generar el nombre del PDF.

        Args:
            appointment (Appointment): Cita a generar el PDF.

        Returns:
            str: Nombre del PDF.
        """

        if appointment.schedule and appointment.schedule.start_time:
            appointment_date_str = appointment.schedule.start_time.strftime(
                "%d%m%Y%H%M"
            )
        else:
            appointment_date_str = "sin_fecha"

        date_str = datetime.now().strftime("%d%m%Y%H%M%S")

        return f"{appointment_date_str}_informe_cita_{date_str}.pdf"

    def set_pdf_metadata(self, pdf_canvas, appointment):
        """
        Metodo para establecer los metadatos del PDF.

        Args:
            pdf_canvas (canvas.Canvas): Canvas del PDF.
            appointment (Appointment): Cita a generar el PDF.
        """
        pdf_canvas.setAuthor("HospitalSys")
        if appointment.schedule and appointment.schedule.start_time:
            pdf_canvas.setTitle(
                f"Informe de Cita Médica {appointment.schedule.start_time.strftime('%d/%m/%Y - %H:%M')}"
            )
        else:
            pdf_canvas.setTitle(f"Informe de Cita Médica sin fecha")
        pdf_canvas.setSubject("Informe de Cita Médica")

    def generate_created_date(self):
        """
        Metodo para generar la fecha de creación del PDF.
        Formato: 'Generado el dd/mm/YYYY a las HH:MM'

        Returns:
            str: Fecha de creación del PDF.
        """
        date_str = datetime.now().strftime("%d/%m/%Y")
        time_str = datetime.now().strftime("%H:%M:%S")

        return f"Generado el {date_str} a las {time_str}"

    def add_detail(self, detail_list, label, value):
        detail_list.append(f"{label}: {value}")

    def generate_appointment_details(self, appointment):
        """
        Metodo para generar los detalles de la cita.

        Args:
            appointment (Appointment): Cita a generar los detalles.

        Returns:
            list: Detalles de la cita.
        """
        details = []

        self.add_detail(details, "Estado", appointment.get_status_text())
        self.add_detail(details, "Tipo", appointment.get_type_text())

        if appointment.specialty and appointment.specialty.name:
            self.add_detail(details, "Especialidad", appointment.specialty.name)

        if appointment.reason:
            self.add_detail(details, "Motivo", appointment.reason)

        if appointment.room and appointment.room.name:
            self.add_detail(
                details,
                "Sala",
                f"{appointment.room.name} - {appointment.room.location}",
            )

        return details

    def generate_doctor_details(self, appointment):
        """
        Metodo para generar los detalles del doctor.

        Args:
            appointment (Appointment): Cita a generar los detalles.

        Returns:
            list: Detalles del doctor.
        """
        details = []

        if appointment.doctor and appointment.doctor.user:
            user = appointment.doctor.user

            if user.name and user.last_name:
                self.add_detail(
                    details, "Nombre", f"Dr/a. {user.name} {user.last_name}"
                )

            if user.email:
                self.add_detail(details, "Correo Electrónico", user.email)
        else:
            self.add_detail(details, "Nombre", "No Asignado")

        return details

    def generate_patient_details(self, appointment):
        """
        Metodo para generar los detalles del paciente.

        Args:
            appointment (Appointment): Cita a generar los detalles.

        Returns:
            list: Detalles del paciente.
        """
        details = []

        if appointment.patient and appointment.patient.user:
            patient = appointment.patient
            user = appointment.patient.user

            if user.name and user.last_name:
                self.add_detail(details, "Nombre", f"{user.name} {user.last_name}")

            if user.email:
                self.add_detail(details, "Correo Electrónico", user.email)

            if patient.phone:
                self.add_detail(details, "Número de Teléfono", patient.phone)

        return details
