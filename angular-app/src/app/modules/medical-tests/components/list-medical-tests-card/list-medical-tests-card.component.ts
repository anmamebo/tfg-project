import { Component, Input } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente que representa una tarjeta de listado de pruebas médicas.
 */
@Component({
  selector: 'app-list-medical-tests-card',
  templateUrl: './list-medical-tests-card.component.html',
})
export class ListMedicalTestsCardComponent extends GenericListCardComponent {
  /** Filtros */
  public filters: any = null;

  /** Identificador del paciente */
  @Input() public patientId: string | null = null;

  constructor(
    private _medicalTestService: MedicalTestService,
    notificationService: NotificationService
  ) {
    super(notificationService);
  }

  public override getItems(page: number, searchTerm?: string): void {
    if (
      searchTerm != undefined &&
      searchTerm != this.entityData.search.search
    ) {
      this.entityData.search.search = searchTerm || '';
      page = 1;
      this.entityData.page = 1;
    }

    let completed: 'true' | 'false' | undefined = undefined;
    let dateFrom: string | undefined = undefined;
    let dateTo: string | undefined = undefined;

    if (this.filters) {
      if (this.filters.completed) {
        completed = this.filters.completed;
      }

      if (this.filters.date) {
        dateFrom = this.filters.date.from;
        dateTo = this.filters.date.to;
      }
    }

    this._medicalTestService
      .getMedicalTestsByPatient(
        {
          page: page,
          numResults: this.entityData.numResults,
          searchTerm: this.entityData.search.search,
          paginate: true,
          sortBy: this.sort.column,
          sortOrder: this.sort.order,
          completed: completed,
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
        this.patientId
      )
      .subscribe({
        next: (response: ListResponse<MedicalTest>) => {
          const paginatedResponse = response as PaginatedResponse<MedicalTest>;
          this.entityData.items = paginatedResponse.results;
          this.entityData.numItems = paginatedResponse.count;
          this.entityData.totalPages = Math.ceil(
            this.entityData.numItems / this.entityData.numResults
          );
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }

  /**
   * Aplica los filtros seleccionados.
   * @param {any} event - Evento con los filtros seleccionados.
   * @returns {void}
   * @public
   */
  public applyFilters(event: any): void {
    this.filters = event;
    this.entityData.page = 1;
    this.getItems(1);
  }
}
