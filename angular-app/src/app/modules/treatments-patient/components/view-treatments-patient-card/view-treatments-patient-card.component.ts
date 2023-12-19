import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Servicios
import { TreatmentService } from 'src/app/core/services/entities/treatment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { PdfTreatmentService } from 'src/app/core/services/pdfs/pdf-treatment.service';

// Modelos
import {
  Treatment,
  StatusBadgeClasses,
  STATUS_BADGE_CLASSES,
} from 'src/app/core/models/treatment.interface';

/**
 * Componente que representa una tarjeta de visualización de tratamientos para el rol de paciente.
 */
@Component({
  selector: 'app-view-treatments-patient-card',
  templateUrl: './view-treatments-patient-card.component.html',
  styleUrls: ['./view-treatments-patient-card.component.scss'],
  providers: [TreatmentService, PdfTreatmentService],
})
export class ViewTreatmentsPatientCardComponent implements OnInit {
  /** Tratamiento. */
  @Input() public treatment: Treatment | null = null;

  /** Título de la tarjeta. */
  public cardTitle: string = 'Tratamiento';

  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;

  /** Evento para refrescar la lista de tratamientos. */
  @Output() public statusChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _treatmentService: TreatmentService,
    private _notificationService: NotificationService,
    private _pdfTreatmentService: PdfTreatmentService
  ) {}

  ngOnInit(): void {
    this._generateTitle();
  }

  /**
   * Genera el título de la tarjeta.
   */
  private _generateTitle() {
    if (this.treatment) {
      const start_date = new Date(this.treatment.start_date);
      const date = format(start_date, 'dd, MMMM yyyy', { locale: es });

      this.cardTitle = date + ' | ' + this.treatment.description;
    }
  }

  /**
   * Completa el tratamiento.
   */
  public completeTreatment() {
    if (!this.treatment) {
      this._notificationService.showErrorToast(
        'No se ha podido completar el tratamiento.'
      );
      return;
    }

    this._notificationService.showConfirmGenericDialog(
      '¿Estás seguro de que quieres completar el tratamiento?',
      '',
      'Confirmar',
      '¡Tratamiento completado!',
      'El tratamiento ha sido completado correctamente.',
      'Cancelar',
      () => {
        if (!this.treatment) return;

        this._treatmentService
          .updateStatus(this.treatment.id, 'completed')
          .subscribe({
            next: () => {
              this.statusChanged.emit();
            },
            error: (error: any) => {
              this._notificationService.showErrorToast(error.message);
            },
          });
      }
    );
  }

  /**
   * Interrumpe el tratamiento.
   */
  public interruptTreatment() {
    if (!this.treatment) {
      this._notificationService.showErrorToast(
        'No se ha podido interrumpir el tratamiento.'
      );
      return;
    }

    this._notificationService.showConfirmGenericDialog(
      '¿Estás seguro de que quieres interrumpir el tratamiento?',
      '',
      'Confirmar',
      '¡Tratamiento interrumpido!',
      'El tratamiento ha sido interrumpido correctamente.',
      'Cancelar',
      () => {
        if (!this.treatment) return;

        this._treatmentService
          .updateStatus(this.treatment.id, 'interrupted')
          .subscribe({
            next: () => {
              this.statusChanged.emit();
            },
            error: (error: any) => {
              this._notificationService.showErrorToast(error.message);
            },
          });
      }
    );
  }

  /**
   * Cancela el tratamiento.
   */
  public cancelTreatment() {
    if (!this.treatment) {
      this._notificationService.showErrorToast(
        'No se ha podido cancelar el tratamiento.'
      );
      return;
    }

    this._notificationService.showConfirmGenericDialog(
      '¿Estás seguro de que quieres cancelar el tratamiento?',
      'Esta acción no se puede deshacer.',
      'Confirmar',
      '¡Tratamiento cancelado!',
      'El tratamiento ha sido cancelado correctamente.',
      'Cancelar',
      () => {
        if (!this.treatment) return;

        this._treatmentService
          .updateStatus(this.treatment.id, 'cancelled')
          .subscribe({
            next: () => {
              this.statusChanged.emit();
            },
            error: (error: any) => {
              this._notificationService.showErrorToast(error.message);
            },
          });
      }
    );
  }

  /**
   * Descarga el PDF de la cita.
   */
  public downloadPDF(): void {
    if (!this.treatment) return;

    this._pdfTreatmentService
      .downloadTreatmentPdf(this.treatment.id)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
      });
  }

  /**
   * Imprime el PDF de la cita.
   */
  public printPDF(): void {
    if (!this.treatment) return;

    this._pdfTreatmentService.printTreatmentPdf(this.treatment.id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
  }
}
