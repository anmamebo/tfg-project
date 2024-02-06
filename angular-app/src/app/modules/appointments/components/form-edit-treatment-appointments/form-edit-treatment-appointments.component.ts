import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Spanish } from 'flatpickr/dist/l10n/es.js';

// Servicios
import { TreatmentService } from 'src/app/core/services/entities/treatment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Treatment } from 'src/app/core/models/treatment.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

/**
 * Componente que representa la tarjeta de edición de un tratamiento
 */
@Component({
  selector: 'app-form-edit-treatment-appointments',
  templateUrl: './form-edit-treatment-appointments.component.html',
  providers: [TreatmentService, DatePipe],
})
export class FormEditTreatmentAppointmentsComponent implements OnInit {
  /** Tratamiento para el que se edita la información */
  @Input() public treatment: Treatment | null = null;

  /** Opciones para el campo de fecha de comienzo */
  public locale = Spanish;

  /** Formulario para la información del tratamiento */
  public editTreatmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha editado un tratamiento */
  @Output() public editedTreatment: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _treatmentService: TreatmentService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editTreatmentForm = this._fb.group({
      description: [
        this.treatment?.description,
        [Validators.required, Validators.maxLength(255)],
      ],
      comments: [this.treatment?.comments, [Validators.maxLength(255)]],
      duration: [
        this.treatment?.duration,
        [Validators.required, Validators.maxLength(50)],
      ],
      application_frequency: [
        this.treatment?.application_frequency,
        [Validators.maxLength(50)],
      ],
      recommended_dosage: [
        this.treatment?.recommended_dosage,
        [Validators.maxLength(50)],
      ],
      start_date: [this.treatment?.start_date, [Validators.required]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.editTreatmentForm;
  }

  /**
   * Ejecuta la lógica al enviar el formulario para editar un tratamiento.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.treatment) return;

    if (this.form.invalid) return;

    const treatment: any = {
      description: this.form.value.description,
      comments: this.form.value.comments || null,
      duration: this.form.value.duration,
      application_frequency: this.form.value.application_frequency || null,
      recommended_dosage: this.form.value.recommended_dosage || null,
      start_date: this._datePipe.transform(
        new Date(this.form.value.start_date),
        'yyyy-MM-dd'
      ),
    };

    this._treatmentService
      .updateTreatment(this.treatment.id, treatment)
      .subscribe({
        next: (response: MessageResponse) => {
          this.editTreatmentForm.reset();
          this.submitted = false;
          this.editedTreatment.emit();
          this._notificationService.showSuccessToast(response.message);
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
