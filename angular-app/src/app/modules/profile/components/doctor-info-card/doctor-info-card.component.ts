import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INTEGER_REGEXP } from 'src/app/core/constants/reg-exp';

// Servicios
import { DoctorService } from 'src/app/core/services/doctor.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Doctor } from 'src/app/core/models/doctor.model';

/**
 * Componente que representa una tarjeta de información de doctor.
 */
@Component({
  selector: 'app-doctor-info-card',
  templateUrl: './doctor-info-card.component.html',
  styleUrls: ['./doctor-info-card.component.scss'],
  providers: [DoctorService, NotificationService],
})
export class DoctorInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Doctor';

  /** Doctor que se mostrará */
  @Input() public doctor: Doctor = new Doctor('', '', false);

  /** Formulario para actualizar los datos del doctor */
  public updateDoctorDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se actualizan los datos del doctor */
  @Output() public updatedDoctorEvent: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateDoctorDataForm = this.formBuilder.group({
      collegiate_number: [
        this.doctor.collegiate_number,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(INTEGER_REGEXP),
        ],
      ],
      is_available: [this.doctor.is_available],
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

    if (this.form.invalid) {
      return;
    }

    const updateDoctor: Doctor = new Doctor(
      this.doctor.id,
      this.form.value.collegiate_number,
      this.doctor.is_available,
      this.doctor.user
    );

    this.doctorService.update(this.doctor.id, updateDoctor).subscribe({
      next: (data) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
        this.updatedDoctorEvent.emit();
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
