import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';

@Component({
  selector: 'app-view-reason-observations-appointments-card',
  templateUrl: './view-reason-observations-appointments-card.component.html',
  providers: [AppointmentService],
})
export class ViewReasonObservationsAppointmentsCardComponent implements OnInit {
  /** Cita que se visualizará */
  @Input() public appointment: Appointment | null = null;

  /** Formulario para las observaciones */
  public observationsForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar la cita */
  @Output() public refreshAppointment: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _appointmentService: AppointmentService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.observationsForm = this._fb.group({
      observations: [
        this.appointment?.observations,
        [Validators.maxLength(255)],
      ],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.observationsForm;
  }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.appointment || !this.appointment.id) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener la cita.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    if (this.form.value.observations === this.appointment?.observations) {
      this._notificationService.showWarningToast(
        'No ha introducido ninguna observación nueva.'
      );
      return;
    }

    const appointment: any = {
      id: this.appointment.id,
      observations: this.form.value.observations
        ? this.form.value.observations
        : null,
    };

    this._appointmentService
      .update(this.appointment.id, appointment)
      .subscribe({
        next: (response: any) => {
          this._notificationService.showSuccessToast(
            'Observaciones actualizadas correctamente.'
          );
          this.refreshAppointment.emit();
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
