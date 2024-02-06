import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

/**
 * Componente que representa la tarjeta de creación de una prueba médica
 */
@Component({
  selector: 'app-form-create-medical-test-appointments',
  templateUrl: './form-create-medical-test-appointments.component.html',
  providers: [MedicalTestService],
})
export class FormCreateMedicalTestAppointmentsComponent {
  /** Cita para la que se crea la prueba médica */
  @Input() appointment: Appointment | null = null;

  /** Formulario para la información de la prueba médica */
  public createMedicalTestForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha creado una prueba médica */
  @Output() public createdMedicalTest: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _medicalTestService: MedicalTestService,
    private _notificationService: NotificationService
  ) {
    this.createMedicalTestForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.createMedicalTestForm;
  }

  /**
   * Ejecuta la lógica al enviar el formulario para crear una prueba médica.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (
      !this.appointment ||
      !this.appointment.id ||
      !this.appointment.doctor ||
      !this.appointment.patient
    ) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener la cita.'
      );
      return;
    }

    if (this.form.invalid) return;

    const medicalTest: any = {
      name: this.form.value.name,
      description: this.form.value.description || null,
      appointment: this.appointment.id,
      doctor: this.appointment.doctor.id,
      patient: this.appointment.patient.id,
    };

    this._medicalTestService.createMedicalTest(medicalTest).subscribe({
      next: (response: MessageResponse) => {
        this.createMedicalTestForm.reset();
        this.submitted = false;
        this.createdMedicalTest.emit();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
