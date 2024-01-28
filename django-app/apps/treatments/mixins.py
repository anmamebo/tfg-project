from datetime import datetime
from io import BytesIO

from django.http import FileResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


class GeneratePDFMixin:
    """
    Mixin para generar un PDF del tratamiento.
    """

    def generate_pdf(self, treatment):
        """
        Metodo para generar un PDF del tratamiento.

        Args:
            treatment (Treatment): Tratamiento a generar el PDF.

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
        pdf_canvas.drawString(x, y, "Informe de Tratamiento Médico")
        y -= line_height * 2

        if treatment.start_date:
            date_str = treatment.start_date.strftime("%d/%m/%Y")
            pdf_canvas.setFont(*subtitle_style)
            pdf_canvas.drawString(
                x,
                y,
                f"Fecha de inicio del tratamiento: {date_str}",
            )
            y -= line_height * 3

        # Detalles del tratamiento
        treatment_details = self.generate_treatment_details(treatment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in treatment_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        y -= line_height * 3

        # Detalles de la cita
        appointment_details = self.generate_appointment_details(treatment.appointment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles de la cita:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in appointment_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        y -= line_height * 3

        # Detalles del médico
        doctor_details = self.generate_doctor_details(treatment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles del Médico:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in doctor_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        y -= line_height * 3

        # Detalles del paciente
        patient_details = self.generate_patient_details(treatment)
        pdf_canvas.setFont(*subtitle_style)
        pdf_canvas.drawString(x, y, "Detalles del Paciente:")
        y -= line_height * 2

        pdf_canvas.setFont(*normal_style)
        for detail in patient_details:
            pdf_canvas.drawString(x, y, detail)
            y -= line_height

        pdf_canvas.showPage()  # Guardar página actual y crear una nueva
        self.set_pdf_metadata(pdf_canvas, treatment)
        pdf_canvas.save()

        buffer.seek(0)
        return FileResponse(
            buffer, as_attachment=True, filename=self.generate_pdf_name(treatment)
        )

    def generate_pdf_name(self, treatment):
        """
        Metodo para generar el nombre del PDF.

        Args:
            treatment (Treatment): Tratamiento a generar el PDF.

        Returns:
            str: Nombre del PDF.
        """

        if treatment.start_date:
            treatment_date_str = treatment.start_date.strftime("%d%m%Y%H%M")
        else:
            treatment_date_str = "sin_fecha"

        date_str = datetime.now().strftime("%d%m%Y%H%M%S")

        return f"{treatment_date_str}_informe_tratamiento_{date_str}.pdf"

    def set_pdf_metadata(self, pdf_canvas, treatment):
        """
        Metodo para establecer los metadatos del PDF.

        Args:
            pdf_canvas (canvas.Canvas): Canvas del PDF.
            treatment (Treatment): Tratamiento a generar el PDF.
        """
        pdf_canvas.setAuthor("HospitalSys")
        if treatment.start_date:
            pdf_canvas.setTitle(
                f"Informe de Tratamiento Médico {treatment.start_date.strftime('%d/%m/%Y - %H:%M')}"
            )
        else:
            pdf_canvas.setTitle(f"Informe de Tratamiento Médico sin fecha")
        pdf_canvas.setSubject("Informe de Tratamiento Médico")

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

    def generate_treatment_details(self, treatment):
        """
        Metodo para generar los detalles del tratamiento.

        Args:
            treatment (Treatment): Tratamiento a generar los detalles.

        Returns:
            list: Detalles del tratamiento.
        """
        details = []

        self.add_detail(details, "Estado", treatment.get_status_text())
        self.add_detail(details, "Descripción", treatment.description)
        self.add_detail(details, "Duración", treatment.duration)

        if treatment.comments:
            self.add_detail(details, "Comentarios", treatment.comments)

        if treatment.application_frequency:
            self.add_detail(
                details, "Frecuencia de aplicación", treatment.application_frequency
            )

        if treatment.recommended_dosage:
            self.add_detail(details, "Dosis recomendada", treatment.recommended_dosage)

        return details

    def generate_appointment_details(self, appointment):
        """
        Metodo para generar los detalles de la cita.

        Args:
            appointment (Appointment): Cita a generar los detalles.

        Returns:
            list: Detalles de la cita.
        """
        details = []

        if appointment.schedule and appointment.schedule.start_time:
            self.add_detail(
                details,
                "Fecha de la cita",
                appointment.schedule.start_time.strftime("%H:%M - %d/%m/%Y"),
            )

        if appointment.reason:
            self.add_detail(details, "Motivo", appointment.reason)

        if appointment.specialty:
            self.add_detail(details, "Especialidad", appointment.specialty.name)

        if appointment.room:
            self.add_detail(
                details,
                "Sala",
                f"{appointment.room.name} - {appointment.room.location}",
            )
        return details

    def generate_doctor_details(self, treatment):
        """
        Metodo para generar los detalles del doctor.

        Args:
            treatment (Treatment): Tratamiento a generar los detalles.

        Returns:
            list: Detalles del doctor.
        """
        details = []

        if treatment.doctor and treatment.doctor.user:
            user = treatment.doctor.user

            if user.name and user.last_name:
                self.add_detail(
                    details, "Nombre", f"Dr/a. {user.name} {user.last_name}"
                )

            if user.email:
                self.add_detail(details, "Correo Electrónico", user.email)
        else:
            self.add_detail(details, "Nombre", "No Asignado")

        return details

    def generate_patient_details(self, treatment):
        """
        Metodo para generar los detalles del paciente.

        Args:
            treatment (Treatment): Tratamiento a generar los detalles.

        Returns:
            list: Detalles del paciente.
        """
        details = []

        if treatment.patient and treatment.patient.user:
            patient = treatment.patient
            user = treatment.patient.user

            if user.name and user.last_name:
                self.add_detail(details, "Nombre", f"{user.name} {user.last_name}")

            if user.email:
                self.add_detail(details, "Correo Electrónico", user.email)

            if patient.phone:
                self.add_detail(details, "Número de Teléfono", patient.phone)

        return details
