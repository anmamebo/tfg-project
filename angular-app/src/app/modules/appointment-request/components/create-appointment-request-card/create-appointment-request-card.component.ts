import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

// Constantes
import { TYPE_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/type-appointment-options.constants';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';

/**
 * Componente que representa la tarjeta de creación de una solicitud de cita
 */
@Component({
  selector: 'app-create-appointment-request-card',
  templateUrl: './create-appointment-request-card.component.html',
  providers: [AppointmentService, MedicalspecialtyService],
})
export class CreateAppointmentRequestCardComponent implements OnInit {
  /** Formulario para la información de la cita */
  public createAppointmentRequestForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Tipos de cita */
  public types: any = [];

  /** Especialidades médicas */
  public medicalSpecialties: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private _fb: FormBuilder,
    private _appointmentService: AppointmentService,
    private _notificationService: NotificationService,
    private _medicalSpecialtyService: MedicalspecialtyService
  ) {
    this.createAppointmentRequestForm = this._fb.group({
      reason: ['', [Validators.required, Validators.maxLength(255)]],
      type: ['', [Validators.required]],
      specialty: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'No hay datos disponibles',
      noFilteredDataAvailablePlaceholderText: 'No hay datos disponibles',
      allowSearchFilter: true,
    };

    this._formatTypes();
    this._getSpecialties();
  }

  get form() {
    return this.createAppointmentRequestForm;
  }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const appointment: any = {
      reason: this.form.value.reason,
      type: this.form.value.type[0].item_id,
      specialty: this.form.value.specialty[0].item_id,
    };

    this._appointmentService.createAppointment(appointment).subscribe({
      next: (response: any) => {
        this.createAppointmentRequestForm.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Obtiene las especialidades médicas.
   */
  private _getSpecialties(): void {
    this._medicalSpecialtyService.getMedicalSpecialties().subscribe({
      next: (response: any) => {
        this.medicalSpecialties = response.map((specialty: any) => ({
          item_id: specialty.id,
          item_text: specialty.name,
        }));
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Formatea los tipos de cita.
   */
  private _formatTypes(): void {
    this.types = TYPE_APPOINTMENT_OPTIONS.map(
      (type: { value: string; text: string }) => {
        return {
          item_id: type.value,
          item_text: type.text,
        };
      }
    );
  }
}
