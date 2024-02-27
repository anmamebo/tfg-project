import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalSpecialty } from '@app/core/models/medical-specialty.interface';
import { ListResponse } from '@app/core/models/response/list-response.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { AppointmentService } from '@app/core/services/entities/appointment.service';
import { MedicalspecialtyService } from '@app/core/services/entities/medicalspecialty.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

/**
 * Componente que representa la tarjeta de creación de una solicitud de cita
 */
@Component({
  selector: 'app-create-appointment-request-card',
  templateUrl: './create-appointment-request-card.component.html',
  providers: [AppointmentService, MedicalspecialtyService],
})
export class CreateAppointmentRequestCardComponent implements OnInit {
  NO_PREFERENCE = 0;
  MORNING_PREFERENCE = 1;
  AFTERNOON_PREFERENCE = 2;

  /** Formulario para la información de la cita */
  public createAppointmentRequestForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

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
      specialty: ['', Validators.required],
      hourPreference: [0, Validators.required],
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

    this._getSpecialties();
  }

  /** Obtiene el formulario. */
  get form() {
    return this.createAppointmentRequestForm;
  }

  /**
   * Ejecuta la lógica al enviar el formulario para crear una cita.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const appointment: any = {
      reason: this.form.value.reason,
      specialty: this.form.value.specialty[0].item_id,
      hours_preference: this.form.value.hourPreference,
    };

    this._appointmentService.createAppointment(appointment).subscribe({
      next: (response: MessageResponse) => {
        this._resetForm();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this._resetForm();
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Reinicia el formulario.
   * @private
   * @returns {void}
   */
  private _resetForm(): void {
    this.submitted = false;
    this.form.get('reason')?.setValue('');
    this.form.get('specialty')?.setValue('');
    this.form.get('hourPreference')?.setValue(0);
  }

  /**
   * Obtiene y actualiza la lista de especialidades médicas.
   * @private
   * @returns {void}
   */
  private _getSpecialties(): void {
    this._medicalSpecialtyService.getItems().subscribe({
      next: (response: ListResponse<MedicalSpecialty>) => {
        if (Array.isArray(response)) {
          this.medicalSpecialties = response.map(
            (specialty: MedicalSpecialty) => ({
              item_id: specialty.id,
              item_text: specialty.name,
            })
          );
        }
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
