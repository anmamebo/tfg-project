import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { DepartmentService } from 'src/app/core/services/department.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Department } from 'src/app/core/models/department.model';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de un departamento
 */
@Component({
  selector: 'app-edit-info-departments-card',
  templateUrl: './edit-info-departments-card.component.html',
  providers: [DepartmentService],
})
export class EditInfoDepartmentsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Departamento que se editará */
  @Input() public department: Department | null = null;

  /** Formulario para editar la información básica de un departamento */
  public editInfoDepartmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editInfoDepartmentForm = this.formBuilder.group({
      name: [
        this.department?.name,
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [this.department?.description, [Validators.maxLength(255)]],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.editInfoDepartmentForm;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.department || !this.department.id) {
      this.notificationService.showErrorToast(
        'No se ha podido obtener el departamento.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.department.id,
      name: this.form.value.name,
      description: this.form.value.description || null,
    };

    this.departmentService.update(this.department.id, updatedData).subscribe({
      next: (data: any) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error: any) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
