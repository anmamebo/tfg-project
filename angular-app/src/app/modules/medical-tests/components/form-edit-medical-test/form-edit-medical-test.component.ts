import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente para el formulario de editar una prueba médica.
 */
@Component({
  selector: 'app-form-edit-medical-test',
  templateUrl: './form-edit-medical-test.component.html',
  providers: [MedicalTestService],
})
export class FormEditMedicalTestComponent implements OnInit {
  /** Prueba médica */
  @Input() public medicalTest: MedicalTest | null = null;

  /** Formulario para completar prueba médica */
  public updateMedicalTestForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha completado la prueba */
  @Output() public updatedMedicalTest: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _medicalTestService: MedicalTestService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateMedicalTestForm = this._fb.group({
      name: [
        this.medicalTest?.name,
        [Validators.required, Validators.maxLength(255)],
      ],
      description: [this.medicalTest?.description, [Validators.maxLength(255)]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.updateMedicalTestForm;
  }

  /**
   * Ejecuta la acción de completar una prueba médica.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.medicalTest || this.form.invalid) {
      return;
    }

    const medicalTest: any = {
      name: this.form.value.name,
      description: this.form.value.description,
    };

    this._medicalTestService
      .updateMedicalTest(this.medicalTest.id, medicalTest)
      .subscribe({
        next: (response: any) => {
          this.form.reset();
          this.submitted = false;
          this.updatedMedicalTest.emit();
          this._notificationService.showSuccessToast(response.message);
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
