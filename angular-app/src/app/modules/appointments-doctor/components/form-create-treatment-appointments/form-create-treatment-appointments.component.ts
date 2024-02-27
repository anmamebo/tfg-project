import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '@app/core/models/appointment.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { TreatmentService } from '@app/core/services/entities/treatment.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

/**
 * Componente que representa la tarjeta de creación de un tratamiento
 */
@Component({
  selector: 'app-form-create-treatment-appointments',
  templateUrl: './form-create-treatment-appointments.component.html',
  providers: [TreatmentService],
})
export class FormCreateTreatmentAppointmentsComponent {
  /** Cita para la que se crea el tratamiento */
  @Input() appointment: Appointment | null = null;

  /** Opciones para el campo de fecha de comienzo */
  public locale = Spanish;

  /** Formulario para la información del tratamiento */
  public createTreatmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha creado un tratamiento */
  @Output() public createdTreatment: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _treatmentService: TreatmentService,
    private _notificationService: NotificationService
  ) {
    this.createTreatmentForm = this._fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      comments: ['', [Validators.maxLength(255)]],
      duration: ['', [Validators.required, Validators.maxLength(50)]],
      application_frequency: ['', [Validators.maxLength(50)]],
      recommended_dosage: ['', [Validators.maxLength(50)]],
      start_date: ['', [Validators.required]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.createTreatmentForm;
  }

  /**
   * Ejecuta la lógica al enviar el formulario para crear un tratamiento.
   * @public
   * @returns {void}
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

    if (this.form.invalid) {
      return;
    }

    let treatment: any = {
      description: this.form.value.description,
      comments: this.form.value.comments || null,
      duration: this.form.value.duration,
      application_frequency: this.form.value.application_frequency || null,
      recommended_dosage: this.form.value.recommended_dosage || null,
      start_date: this.form.value.start_date,
      doctor: this.appointment.doctor.id,
      patient: this.appointment.patient.id,
      appointment: this.appointment.id,
    };

    this._treatmentService.createTreatment(treatment).subscribe({
      next: (response: MessageResponse) => {
        this.createTreatmentForm.reset();
        this.submitted = false;
        this.createdTreatment.emit();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
