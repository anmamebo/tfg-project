import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de creación de una especialidad médica
 */
@Component({
  selector: 'app-create-medical-specialties-card',
  templateUrl: './create-medical-specialties-card.component.html',
  providers: [MedicalspecialtyService],
})
export class CreateMedicalSpecialtiesCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Especialidad Médica';

  /** Formulario para la información de la especialidad médica */
  public createMedicalSpecialtyForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _medicalSpecialtyService: MedicalspecialtyService,
    private _notificationService: NotificationService
  ) {
    this.createMedicalSpecialtyForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  get form() {
    return this.createMedicalSpecialtyForm;
  }

  /**
   * Maneja el envío del formulario para la creación de una nueva especialidad médica.
   * Crea una nueva especialidad médica utilizando la información ingresada en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const medicalSpecialty: any = {
      name: this.form.value.name,
      description: this.form.value.description || null,
    };

    this._medicalSpecialtyService.create(medicalSpecialty).subscribe({
      next: (response: MessageResponse) => {
        this.form.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
