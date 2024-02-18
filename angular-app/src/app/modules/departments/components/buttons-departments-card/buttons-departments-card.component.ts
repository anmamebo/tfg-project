import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para los botones de la tarjeta de un departamento
 */
@Component({
  selector: 'app-buttons-departments-card',
  templateUrl: './buttons-departments-card.component.html',
  providers: [DepartmentService],
})
export class ButtonsDepartmentsCardComponent {
  /** Identificador del departamento */
  @Input() public departmentId: string = '';

  /** Indica si el departamento está activo */
  @Input() public isActive: boolean = true;

  /** Evento para refrescar el departamento */
  @Output() public refreshDepartment: EventEmitter<void> = new EventEmitter();

  constructor(
    private _departmentService: DepartmentService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina un departamento específico.
   * Muestra un diálogo de confirmación antes de la eliminación.
   * Emite un evento de actualización ('refreshDepartment') después de eliminar el departamento.
   * @public
   * @param {string} id - El ID del departamento que se eliminará.
   * @returns {void}
   */
  public deleteDepartment(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._departmentService.delete(id).subscribe({
        next: () => {
          this.refreshDepartment.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar el departamento.'
          );
        },
      });
    });
  }

  /**
   * Activa un departamento específico.
   * Muestra un diálogo de confirmación antes de la activación.
   * Emite un evento de actualización ('refreshDepartment') después de activar el departamento.
   * @public
   * @param {string} id - El ID del departamento que se activará.
   * @returns {void}
   */
  public activateDepartment(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._departmentService.activate(id).subscribe({
        next: () => {
          this.refreshDepartment.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido activar el departamento.'
          );
        },
      });
    });
  }
}
