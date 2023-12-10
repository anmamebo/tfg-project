import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { DepartmentService } from 'src/app/core/services/department.service';
import { NotificationService } from 'src/app/core/services/notification.service';

/**
 * Componente que representa la tarjeta de creación de un departamento
 */
@Component({
  selector: 'app-create-departments-card',
  templateUrl: './create-departments-card.component.html',
  providers: [DepartmentService],
})
export class CreateDepartmentsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Departamento';

  /** Formulario para la información del departamento */
  public createDepartmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {
    this.createDepartmentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  get form() {
    return this.createDepartmentForm;
  }

  /**
   * Maneja la acción de enviar el formulario.
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

    this.departmentService.create(department).subscribe({
      next: (data: any) => {
        this.form.reset();
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error: any) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
