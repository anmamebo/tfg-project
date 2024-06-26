import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '@app/core/models/department.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { DepartmentService } from '@app/core/services/entities/department.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';

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
  /** Departamento que se editará */
  @Input() public department: Department | null = null;

  /** Formulario para editar la información básica de un departamento */
  public editInfoDepartmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _departmentService: DepartmentService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editInfoDepartmentForm = this._fb.group({
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
   * Realiza la acción de envío del formulario.
   * Actualiza la información del departamento si es válido y está completo.
   * Muestra notificaciones de error o éxito según corresponda.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.department || !this.department.id) {
      this._notificationService.showErrorToast(
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

    this._departmentService.update(this.department.id, updatedData).subscribe({
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
