import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '@app/core/models/appointment.interface';
import { MedicalTest } from '@app/core/models/medical-test.interface';
import {
  ListResponse,
  PaginatedResponse,
} from '@app/core/models/response/list-response.interface';
import { MedicalTestService } from '@app/core/services/entities/medicaltest.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { GenericListCardComponent } from '@app/shared/components/generic-list-card/generic-list-card.component';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

/**
 * Componente que representa una tarjeta de listado de pruebas médicas de una cita.
 */
@Component({
  selector: 'app-view-medical-tests-appointments-doctor-card',
  templateUrl: './view-medical-tests-appointments-doctor-card.component.html',
  providers: [MedicalTestService],
})
export class ViewMedicalTestsAppointmentsDoctorCardComponent extends GenericListCardComponent {
  /** Cita. */
  @Input() public appointment: Appointment | null = null;

  constructor(
    private _medicalTestService: MedicalTestService,
    notificationService: NotificationService,
    route: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets
  ) {
    super(notificationService, route);
    this.urlSearch = false;
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
