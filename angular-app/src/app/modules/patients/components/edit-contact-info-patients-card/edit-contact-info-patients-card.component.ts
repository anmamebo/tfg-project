import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PHONENUMBER_REGEXP } from 'src/app/core/constants/reg-exp';

// Servicios
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { PatientService } from 'src/app/core/services/entities/patient.service';

// Modelos
import { Patient } from 'src/app/core/models/patient.interface';

/**
 * Componente que representa la tarjeta de edición de la
 * información de contacto de un paciente.
 */
@Component({
  selector: 'app-edit-contact-info-patients-card',
  templateUrl: './edit-contact-info-patients-card.component.html',
  providers: [PatientService, NotificationService],
})
export class EditContactInfoPatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información de Contacto';

  /** Paciente que se editará */
  @Input() public patient: Patient | null = null;

  /** Formulario para editar la información de contacto de un paciente */
  public editContactInfoPatientForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar los datos del paciente */
  @Output() public refreshPatient: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _patientService: PatientService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editContactInfoPatientForm = this._fb.group({
      username: [this.patient?.user?.username, Validators.required],
      email: [
        this.patient?.user?.email,
        [Validators.required, Validators.email],
      ],
      phone: [this.patient?.phone, [Validators.pattern(PHONENUMBER_REGEXP)]],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.editContactInfoPatientForm;
  }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (
      !this.patient ||
      !this.patient.id ||
      !this.patient.user ||
      !this.patient.user.id
    ) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener el paciente.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.patient.id,
      phone: this.form.value.phone || null,
      user: {
        id: this.patient.user.id,
        username: this.patient.user.username,
        email: this.form.value.email,
      },
    };

    this._patientService.update(this.patient.id, updatedData).subscribe({
      next: (data) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(data.message);
        this.refreshPatient.emit();
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
