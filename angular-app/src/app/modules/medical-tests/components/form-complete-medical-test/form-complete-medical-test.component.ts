import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para el formulario de completar una prueba médica.
 */
@Component({
  selector: 'app-form-complete-medical-test',
  templateUrl: './form-complete-medical-test.component.html',
  providers: [MedicalTestService],
})
export class FormCompleteMedicalTestComponent {
  /** Id de la prueba médica */
  @Input() public medicalTestId: string | null = null;

  /** Formulario para completar prueba médica */
  public completeMedicalTestForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha completado la prueba */
  @Output() public completedMedicalTest: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _medicalTestService: MedicalTestService,
    private _notificationService: NotificationService
  ) {
    this.completeMedicalTestForm = this._fb.group({
      result: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.completeMedicalTestForm;
  }

  /**
   * Ejecuta la acción de completar una prueba médica.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.medicalTestId || this.form.invalid) {
      return;
    }

    const medicalTest: any = {
      is_completed: true,
      result: this.form.value.result,
    };

    this._medicalTestService
      .updateMedicalTest(this.medicalTestId, medicalTest)
      .subscribe({
        next: (response: any) => {
          this.form.reset();
          this.submitted = false;
          this.completedMedicalTest.emit();
          this._notificationService.showSuccessToast(response.message);
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
