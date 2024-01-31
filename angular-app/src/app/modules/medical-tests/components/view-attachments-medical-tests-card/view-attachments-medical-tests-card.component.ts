import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { MedicalTestAttachment } from 'src/app/core/models/medical-test.interface';

// Constantes
import { ALLOWED_FILE_EXTENSIONS } from 'src/app/core/constants/attachments-file-extensions.constants';

/**
 * Componente para la visualización de los ficheros adjuntos de una prueba médica.
 */
@Component({
  selector: 'app-view-attachments-medical-tests-card',
  templateUrl: './view-attachments-medical-tests-card.component.html',
  styleUrls: ['./view-attachments-medical-tests-card.component.scss'],
  providers: [MedicalTestService],
})
export class ViewAttachmentsMedicalTestsCardComponent {
  /** Id de la prueba médica */
  @Input() public medicalTestId: string | null = null;

  /** Listado de ficheros adjuntos */
  @Input() public attachments: MedicalTestAttachment[] = [];

  /** Evento para indicar que se ha subido un fichero adjunto */
  @Output() public updateAttachment: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _medicalTestService: MedicalTestService,
    private _notificationService: NotificationService,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  /**
   * Comprueba si el fichero tiene extensión de imagen
   * @param {string} extension Extensión del fichero
   * @returns True si la extensión es de imagen
   * @public
   */
  public hasFileIcon(extension: string): boolean {
    return ALLOWED_FILE_EXTENSIONS.includes(extension);
  }

  /**
   * Descarga un fichero adjunto
   * @param {string} attachmentId Id del fichero adjunto
   * @returns {void}
   * @public
   */
  public downloadFile(attachmentId: string): void {
    this._medicalTestService
      .downloadMedicalTestAttachment(attachmentId)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
      });
  }

  /**
   * Elimina un fichero adjunto
   * @param {string} attachmentId Id del fichero adjunto
   * @returns {void}
   * @public
   */
  public deleteFile(attachmentId: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._medicalTestService
        .deleteMedicalTestAttachment(attachmentId)
        .subscribe({
          next: () => {
            this.updateAttachment.emit();
          },
          error: (error: any) => {
            this._notificationService.showErrorToast(error.message);
          },
        });
    });
  }
}
