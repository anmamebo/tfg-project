import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";

import { Spanish } from "flatpickr/dist/l10n/es.js";
import { GENDER_OPTIONS } from "src/app/core/constants/genders-options";
import { PHONENUMBER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { PatientService } from "src/app/core/services/patient.service";
import { NotificationService } from "src/app/core/services/notification.service";

// Modelos
import { Patient } from 'src/app/core/models/patient.model';


/**
 * Componente que representa una tarjeta de información de paciente.
 */
@Component({
  selector: 'app-patient-info-card',
  templateUrl: './patient-info-card.component.html',
  styleUrls: ['./patient-info-card.component.scss'],
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
  @Input() public patient: Patient = new Patient('', '');

  /** Formulario para actualizar los datos del paciente */
  public updatePatientDataForm: FormGroup = new FormGroup({
    dni: new FormControl(''),
    social_security: new FormControl(''),
    gender: new FormControl(''),
    birthdate: new FormControl(''),
    phone: new FormControl(''),
  });

  /** Indica si se ha enviado el formulario */
  public submitted: Boolean = false;

  /** Evento que se emite cuando se actualizan los datos del paciente */
  @Output() public updatedPatientEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.updatePatientDataForm = this.formBuilder.group({
      dni: [this.patient.dni, [Validators.required, Validators.maxLength(9)]],
      social_security: [this.patient.social_security, Validators.maxLength(12)],
      gender: [this.patient.gender, Validators.required],
      birthdate: [this.patient.birthdate],
      phone: [this.patient.phone, [Validators.pattern(PHONENUMBER_REGEXP)]],
    });
  }

  /**
   * Obtiene los controles del formulario
   * @returns Los controles del formulario
   */
  get form() {
    return this.updatePatientDataForm.controls;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.updatePatientDataForm.invalid) {
      return;
    }

    let birthdate = null;
    if (this.updatePatientDataForm.value.birthdate) {
      birthdate = this.datePipe.transform(new Date(this.updatePatientDataForm.value.birthdate), 'yyyy-MM-dd');
    }

    const updatePatient: Patient = new Patient(
      this.patient.id,
      this.updatePatientDataForm.value.dni,
      birthdate ? birthdate : null,
      this.updatePatientDataForm.value.gender,
      this.updatePatientDataForm.value.phone != '' ? this.updatePatientDataForm.value.phone : null,
      this.updatePatientDataForm.value.social_security
    );

    this.patientService.updatePatient(updatePatient).subscribe({
      next: (data) => {
        this.submitted = false;
        this.updatedPatientEvent.emit();
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
