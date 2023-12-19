import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INTEGER_REGEXP } from 'src/app/core/constants/reg-exp';

// Servicios
import { DoctorService } from 'src/app/core/services/entities/doctor.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Doctor } from 'src/app/core/models/doctor.model';

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
   * Maneja la acción de envio del formulario
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
      next: (data) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(data.message);
        this.updatedDoctorEvent.emit();
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
