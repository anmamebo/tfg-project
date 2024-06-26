import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INTEGER_REGEXP } from '@app/core/constants/regex.constants';
import { Doctor } from '@app/core/models/doctor.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { DoctorService } from '@app/core/services/entities/doctor.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';

/**
 * Componente que representa una tarjeta de información de doctor.
 */
@Component({
  selector: 'app-doctor-info-card',
  templateUrl: './doctor-info-card.component.html',
  providers: [DoctorService, NotificationService],
})
export class DoctorInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Médico';

  /** Doctor que se mostrará */
  @Input() public doctor: Doctor | null = null;

  /** Formulario para actualizar los datos del doctor */
  public updateDoctorDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se actualizan los datos del doctor */
  @Output() public updatedDoctorEvent: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _doctorService: DoctorService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateDoctorDataForm = this._fb.group({
      collegiate_number: [
        this.doctor?.collegiate_number,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(INTEGER_REGEXP),
        ],
      ],
      is_available: [this.doctor?.is_available],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.updateDoctorDataForm;
  }

  /**
   * Actualiza la información del doctor con los datos proporcionados en el formulario.
   * Realiza una solicitud para actualizar los detalles del doctor y muestra notificaciones de éxito o error según el resultado.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.doctor || !this.doctor.id) {
      this._notificationService.showErrorToast(
        'No se puede actualizar la información del doctor'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updateDoctor: any = {
      id: this.doctor.id,
      collegiate_number: this.form.value.collegiate_number,
      is_available: this.doctor.is_available,
      user: this.doctor.user,
    };

    this._doctorService.update(this.doctor.id, updateDoctor).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
        this.updatedDoctorEvent.emit();
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
