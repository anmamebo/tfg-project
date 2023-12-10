import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { GENDER_OPTIONS } from 'src/app/core/constants/options/genders-options.constants';
import { PHONENUMBER_REGEXP } from 'src/app/core/constants/reg-exp';

// Servicios
import { PatientService } from 'src/app/core/services/patient.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Patient } from 'src/app/core/models/patient.model';

/**
 * Componente que representa una tarjeta de información de paciente.
 */
@Component({
  selector: 'app-patient-info-card',
  templateUrl: './patient-info-card.component.html',
  providers: [DatePipe, PatientService, NotificationService],
})
export class PatientInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Paciente';

  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Paciente que se mostrará */
  @Input() public patient: Patient | null = null;

  /** Formulario para actualizar los datos del paciente */
  public updatePatientDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se actualizan los datos del paciente */
  @Output() public updatedPatientEvent: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updatePatientDataForm = this.formBuilder.group({
      dni: [this.patient?.dni, [Validators.required, Validators.maxLength(9)]],
      social_security: [
        this.patient?.social_security,
        Validators.maxLength(12),
      ],
      gender: [this.patient?.gender, Validators.required],
      birthdate: [this.patient?.birthdate],
      phone: [this.patient?.phone, [Validators.pattern(PHONENUMBER_REGEXP)]],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.updatePatientDataForm;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.patient || !this.patient.id) {
      this.notificationService.showErrorToast(
        'No se puede actualizar la información del paciente'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatePatient: any = {
      id: this.patient.id,
      din: this.form.value.dni,
      birthdate: this.form.value.birthdate
        ? this.datePipe.transform(
            new Date(this.form.value.birthdate),
            'yyyy-MM-dd'
          )
        : null,
      gender: this.form.value.gender,
      phone: this.form.value.phone || null,
      social_security: this.form.value.social_security || null,
    };

    this.patientService.update(this.patient.id, updatePatient).subscribe({
      next: (data) => {
        this.submitted = false;
        this.updatedPatientEvent.emit();
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
