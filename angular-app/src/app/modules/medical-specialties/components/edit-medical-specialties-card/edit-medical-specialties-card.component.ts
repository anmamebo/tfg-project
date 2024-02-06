import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { MedicalSpecialty } from 'src/app/core/models/medical-specialty.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de una especialidad médica
 */
@Component({
  selector: 'app-edit-medical-specialties-card',
  templateUrl: './edit-medical-specialties-card.component.html',
  providers: [MedicalspecialtyService],
})
export class EditMedicalSpecialtiesCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Especialidad médica que se editará */
  @Input() public medicalSpecialty: MedicalSpecialty | null = null;

  /** Formulario para editar la información básica de una especialidad médica */
  public editMedicalSpecialtyForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _medicalSpecialtyService: MedicalspecialtyService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editMedicalSpecialtyForm = this._fb.group({
      name: [
        this.medicalSpecialty?.name,
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [
        this.medicalSpecialty?.description,
        [Validators.maxLength(255)],
      ],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.editMedicalSpecialtyForm;
  }

  /**
   * Maneja el envío del formulario para la actualización de una especialidad médica existente.
   * Actualiza la información de la especialidad médica en función de los datos ingresados en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.medicalSpecialty || !this.medicalSpecialty.id) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener la sala.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updateMedicalSpecialty: MedicalSpecialty = {
      id: this.medicalSpecialty.id,
      name: this.form.value.name,
      description: this.form.value.description || null,
    };

    this._medicalSpecialtyService
      .update(this.medicalSpecialty.id, updateMedicalSpecialty)
      .subscribe({
        next: (response: MessageResponse) => {
          this.submitted = false;
          this._notificationService.showSuccessToast(response.message);
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
