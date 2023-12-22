import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { TreatmentService } from 'src/app/core/services/entities/treatment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa una tarjeta de listado de tratamientos para el rol de paciente.
 */
@Component({
  selector: 'app-list-treatments-historical-patient-card',
  templateUrl: './list-treatments-historical-patient-card.component.html',
})
export class ListTreatmentsHistoricalPatientCardComponent extends GenericListCardComponent {
  constructor(
    private _treatmentService: TreatmentService,
    notificationService: NotificationService
  ) {
    super(notificationService);
    this.sort.column = 'start_date';
    this.sort.order = 'desc';
  }

  /**
   * Obtiene los elementos correspondientes a una página específica y un término de búsqueda opcional.
   * @public
   * @param {number} page - El número de página a obtener.
   * @param {string} [searchTerm] - El término de búsqueda opcional.
   * @returns {void}
   */
  public override getItems(page: number, searchTerm?: string): void {
    if (
      searchTerm != undefined &&
      searchTerm != this.entityData.search.search
    ) {
      this.entityData.search.search = searchTerm || '';
      page = 1;
      this.entityData.page = 1;
    }

    this._treatmentService
      .getTreatmentsByPatient({
        statuses: ['completed', 'interrupted', 'cancelled'],
        page: page,
        numResults: this.entityData.numResults,
        searchTerm: this.entityData.search.search,
        paginate: true,
        sortBy: this.sort.column,
        sortOrder: this.sort.order,
      })
      .subscribe({
        next: (response: any) => {
          this.entityData.items = response.results;
          this.entityData.numItems = response.count;
          this.entityData.totalPages = Math.ceil(
            this.entityData.numItems / this.entityData.numResults
          );
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }
}
