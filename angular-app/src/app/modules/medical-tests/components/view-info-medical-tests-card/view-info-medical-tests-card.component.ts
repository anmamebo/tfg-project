import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { MedicalTest } from 'src/app/core/models/medical-test.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

/**
 * Componente para mostrar la información de un examen médico
 */
@Component({
  selector: 'app-view-info-medical-tests-card',
  templateUrl: './view-info-medical-tests-card.component.html',
  providers: [MedicalTestService],
})
export class ViewInfoMedicalTestsCardComponent {
  /** Examen médico a mostrar */
  @Input() public medicalTest: MedicalTest | null = null;

  /** Evento para indicar que se ha actualizado la prueba */
  @Output() public updatedMedicalTest: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    public readonly swalTargets: SwalPortalTargets,
    private _medicalTestService: MedicalTestService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina un examen médico según su ID.
   * Muestra un diálogo de confirmación antes de realizar la eliminación.
   * Emite un evento para actualizar la lista de pruebas médicas después de la eliminación exitosa.
   * @param {string} id - El ID del examen médico que se desea eliminar.
   * @returns {void}
   * @public
   */
  public onDelete(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._medicalTestService.deleteMedicalTest(id).subscribe({
        next: (response: MessageResponse) => {
          this._notificationService.showSuccessToast(response.message);
          this.updatedMedicalTest.emit();
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
    });
  }

  /**
   * Activa un examen médico según su ID.
   * Muestra un diálogo de confirmación antes de realizar la activación.
   * Emite un evento para actualizar la lista de pruebas médicas después de la activación exitosa.
   * @param {string} id - El ID del examen médico.
   * @returns {void}
   * @public
   */
  public onActivate(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._medicalTestService.activateMedicalTest(id).subscribe({
        next: (response: MessageResponse) => {
          this._notificationService.showSuccessToast(response.message);
          this.updatedMedicalTest.emit();
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
    });
  }
}
