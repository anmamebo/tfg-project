import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de creación de un departamento
 */
@Component({
  selector: 'app-create-departments-card',
  templateUrl: './create-departments-card.component.html',
  providers: [DepartmentService],
})
export class CreateDepartmentsCardComponent {
  /** Formulario para la información del departamento */
  public createDepartmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _departmentService: DepartmentService,
    private _notificationService: NotificationService
  ) {
    this.createDepartmentForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  get form() {
    return this.createDepartmentForm;
  }

  /**
   * Método público que se ejecuta al enviar un formulario.
   * Realiza validaciones y crea un departamento si los datos son válidos.
   * @public
   * @returns {void}
   */

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const department: any = {
      name: this.form.value.name,
      description: this.form.value.description || null,
    };

    this._departmentService.create(department).subscribe({
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
