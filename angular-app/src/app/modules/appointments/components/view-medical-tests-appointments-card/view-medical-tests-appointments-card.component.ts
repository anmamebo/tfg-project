import { Component, Input } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Appointment } from 'src/app/core/models/appointment.interface';
import { MedicalTest } from 'src/app/core/models/medical-test.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

/**
 * Componente que representa una tarjeta de listado de pruebas médicas de una cita.
 */
@Component({
  selector: 'app-view-medical-tests-appointments-card',
  templateUrl: './view-medical-tests-appointments-card.component.html',
  providers: [MedicalTestService],
})
export class ViewMedicalTestsAppointmentsCardComponent extends GenericListCardComponent {
  /** Cita. */
  @Input() public appointment: Appointment | null = null;

  constructor(
    private _medicalTestService: MedicalTestService,
    notificationService: NotificationService,
    public readonly swalTargets: SwalPortalTargets
  ) {
    super(notificationService);
    this.entityData.numResults = 5;
  }

  /**
   * Obtiene las pruebas médicas relacionadas con una cita específica para mostrarlas en la interfaz.
   * @public
   * @returns {void}
   */
  public override getItems(): void {
    if (!this.appointment) return;

    this._medicalTestService
      .getMedicalTestsByAppointment(this.appointment.id, {
        page: this.entityData.page,
        numResults: this.entityData.numResults,
        paginate: true,
      })
      .subscribe({
        next: (response: ListResponse<MedicalTest>) => {
          const paginatedResponse = response as PaginatedResponse<MedicalTest>;
          this.entityData.items = paginatedResponse.results;
          this.entityData.numItems = paginatedResponse.count;
          this.entityData.totalPages = paginatedResponse.total_pages;
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }
}
