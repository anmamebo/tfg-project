import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";

import { Spanish } from "flatpickr/dist/l10n/es.js";
import { GENDER_OPTIONS } from "src/app/core/constants/genders-options";

// Servicios
import { PatientService } from "src/app/core/services/patient.service";
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Patient } from "src/app/core/models/patient.model";


/**
 * Componente que representa la tarjeta de edición de la 
 * información básica de un paciente
 */
@Component({
  selector: 'app-edit-basic-info-patients-card',
  templateUrl: './edit-basic-info-patients-card.component.html',
  styleUrls: ['./edit-basic-info-patients-card.component.scss'],
  providers: [DatePipe, PatientService],
})
export class EditBasicInfoPatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Paciente que se editará */
  @Input() public patient: Patient | null = null;

  /** Formulario para editar la información básica de un paciente */
  public editBasicInfoPatientForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    dni: new FormControl(''),
    social_security: new FormControl(''),
    birthdate: new FormControl(''),
    gender: new FormControl('')
  });

  /** Indica si se ha enviado el formulario */
  public submitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editBasicInfoPatientForm = this.formBuilder.group({
      name: [this.patient?.user?.name, Validators.required],
      last_name: [this.patient?.user?.last_name, Validators.required],
      dni: [this.patient?.dni, [Validators.required, Validators.maxLength(9)]],
      social_security: [this.patient?.social_security, Validators.maxLength(12)],
      birthdate: [this.patient?.birthdate],
      gender: [this.patient?.gender, Validators.required]
    });
  }

  /**
   * Obtiene los controles del formulario
   * @returns Los controles del formulario
   */
  get form() {
    return this.editBasicInfoPatientForm.controls;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.editBasicInfoPatientForm.invalid) {
      return;
    }

    let birthdate = null;
    if (this.editBasicInfoPatientForm.value.birthdate) {
      birthdate = this.datePipe.transform(new Date(this.editBasicInfoPatientForm.value.birthdate), 'yyyy-MM-dd');
    }

    const updatedData: any = {
      id: this.patient?.id,
      dni: this.editBasicInfoPatientForm.value.dni,
      social_security: this.editBasicInfoPatientForm.value.social_security ? this.editBasicInfoPatientForm.value.social_security : null,
      birthdate: birthdate ? birthdate : null,
      gender: this.editBasicInfoPatientForm.value.gender,
      user: {
        id: this.patient?.user?.id,
        name: this.editBasicInfoPatientForm.value.name,
        last_name: this.editBasicInfoPatientForm.value.last_name,
      }
    }

    this.patientService.updatePatient(updatedData).subscribe({
      next: (data) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
