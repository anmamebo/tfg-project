import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";

import { Spanish } from "flatpickr/dist/l10n/es.js";
import { GENDER_OPTIONS } from "src/app/core/constants/options/genders-options.constants";

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
  public editBasicInfoPatientForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar los datos del paciente */
  @Output() public refreshPatient: EventEmitter<void> = new EventEmitter<void>();

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

  /** Obtiene el formulario */
  get form () { return this.editBasicInfoPatientForm; }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.patient?.id,
      dni: this.form.value.dni,
      social_security: this.form.value.social_security ? this.form.value.social_security : null,
      birthdate: this.form.value.birthdate ? this.datePipe.transform(new Date(this.form.value.birthdate), 'yyyy-MM-dd') : null,
      gender: this.form.value.gender,
      user: {
        id: this.patient?.user?.id,
        name: this.form.value.name,
        last_name: this.form.value.last_name,
      }
    }

    this.patientService.update(this.patient!.id, updatedData).subscribe({
      next: (data) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
        this.refreshPatient.emit();
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
