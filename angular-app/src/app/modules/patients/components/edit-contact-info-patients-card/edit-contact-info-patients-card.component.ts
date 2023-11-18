import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { PHONENUMBER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { NotificationService } from "src/app/core/services/notification.service";
import { PatientService } from "src/app/core/services/patient.service";

// Modelos
import { Patient } from "src/app/core/models/patient.model";


/**
 * Componente que representa la tarjeta de edición de la
 * información de contacto de un paciente.
 */
@Component({
  selector: 'app-edit-contact-info-patients-card',
  templateUrl: './edit-contact-info-patients-card.component.html',
  styleUrls: ['./edit-contact-info-patients-card.component.scss'],
  providers: [PatientService, NotificationService]
})
export class EditContactInfoPatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información de Contacto';

  /** Paciente que se editará */
  @Input() public patient: Patient | null = null;

  /** Formulario para editar la información de contacto de un paciente */
  public editContactInfoPatientForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  /** Indica si se ha enviado el formulario */
  public submitted: Boolean = false;

  /** Evento que se emite cuando se edita la información de contacto de un paciente */
  @Output() public patientEditedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editContactInfoPatientForm = this.formBuilder.group({
      username: [this.patient?.user?.username, Validators.required],
      email: [this.patient?.user?.email, [Validators.required, Validators.email]],
      phone: [this.patient?.phone, [Validators.pattern(PHONENUMBER_REGEXP)]]
    });
  }

  /**
   * Obtiene los controles del formulario
   * @returns Los controles del formulario
   */
  get form() {
    return this.editContactInfoPatientForm.controls;
  }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.editContactInfoPatientForm.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.patient?.id,
      phone: this.editContactInfoPatientForm.value.phone,
      user: {
        id: this.patient?.user?.id,
        username: this.patient?.user?.username,
        email: this.editContactInfoPatientForm.value.email
      }
    };

    this.patientService.updatePatient(updatedData).subscribe({
      next: (data) => {
        this.submitted = false;
        this.patientEditedEvent.emit();
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
