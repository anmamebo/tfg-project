import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Spanish } from 'flatpickr/dist/l10n/es.js';

// Servicios
import { TreatmentService } from 'src/app/core/services/treatment.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.model';

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

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Formulario para la información del tratamiento */
  public createTreatmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha creado un tratamiento */
  @Output() public createdTreatment: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private treatmentService: TreatmentService,
    private notificationService: NotificationService
  ) {
    this.createTreatmentForm = this.formBuilder.group({
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
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let treatment: any = {
      description: this.form.value.description,
      comments: this.form.value.comments ? this.form.value.comments : null,
      duration: this.form.value.duration,
      application_frequency: this.form.value.application_frequency
        ? this.form.value.application_frequency
        : null,
      recommended_dosage: this.form.value.recommended_dosage
        ? this.form.value.recommended_dosage
        : null,
      start_date: this.form.value.start_date,
      doctor: this.appointment?.doctor?.id,
      patient: this.appointment?.patient?.id,
      appointment: this.appointment?.id,
    };

    this.treatmentService.createTreatment(treatment).subscribe({
      next: (response: any) => {
        this.createTreatmentForm.reset();
        this.submitted = false;
        this.createdTreatment.emit();
        this.notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
