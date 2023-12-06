import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.model';

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
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.observationsForm = this.formBuilder.group({
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

    if (this.form.invalid) {
      return;
    }

    if (this.form.value.observations === this.appointment?.observations) {
      this.notificationService.showWarningToast(
        'No ha introducido ninguna observación nueva.'
      );
      return;
    }

    const appointment: any = {
      id: this.appointment?.id,
      observations: this.form.value.observations
        ? this.form.value.observations
        : null,
    };

    this.appointmentService
      .update(this.appointment!.id, appointment)
      .subscribe({
        next: (response: any) => {
          this.notificationService.showSuccessToast(
            'Observaciones actualizadas correctamente.'
          );
          this.refreshAppointment.emit();
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }
}
