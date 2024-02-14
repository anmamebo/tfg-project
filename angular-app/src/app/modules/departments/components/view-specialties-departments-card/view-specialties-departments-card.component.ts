import { Component, Input, OnInit } from '@angular/core';
import { MedicalSpecialty } from 'src/app/core/models/medical-specialty.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de visualización de las especialidades
 * de un departamento
 */
@Component({
  selector: 'app-view-specialties-departments-card',
  templateUrl: './view-specialties-departments-card.component.html',
  providers: [MedicalspecialtyService],
})
export class ViewSpecialtiesDepartmentsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Especialidades';

  /** Identificador del departamento */
  @Input() public departmentId: string = '';

  /** Especialidades médicas que se visualizarán */
  public specialties: MedicalSpecialty[] = [];

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [{ header: 'NOMBRE', field: 'name' }];

  /** Texto de información para la búsqueda. */
  public searchInfoTooltip =
    'Buscar especialidades por id, nombre o descripción.';

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de especialidades totales. */
  public numSpecialties: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 5;

  /** Término de búsqueda */
  public search: string = '';

  /** Indica si la búsqueda se realiza en la URL. */
  public urlSearch: boolean = false;

  constructor(
    private _medicalSpecialtyService: MedicalspecialtyService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getSpecialtiesByDepartmentId();
  }

  /**
   * Cambia la página de visualización y actualiza las especialidades médicas por departamento en la nueva página.
   * @param {number} page - El número de página al que se desea navegar.
   * @returns {void}
   * @public
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getSpecialtiesByDepartmentId();
  }

  /**
   * Maneja el evento de envío de búsqueda y actualiza la lista de especialidades médicas por departamento con el término de búsqueda proporcionado.
   * @param {string} searchTerm - Término de búsqueda para filtrar la lista de especialidades médicas.
   * @returns {void}
   * @public
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.search = searchTerm;
    this.page = 1;
    this.getSpecialtiesByDepartmentId();
  }

  /**
   * Obtiene la lista de especialidades médicas por departamento, opcionalmente filtrada por término de búsqueda y paginada.
   * @returns {void}
   * @public
   */
  public getSpecialtiesByDepartmentId(): void {
    this._medicalSpecialtyService
      .getRoomsByDepartmentId(this.departmentId, {
        page: this.page,
        paginate: true,
        searchTerm: this.search,
        pageSize: this.numResults,
      })
      .subscribe({
        next: (response: ListResponse<MedicalSpecialty>) => {
          const paginatedResponse =
            response as PaginatedResponse<MedicalSpecialty>;
          this.specialties = paginatedResponse.results;
          this.numSpecialties = paginatedResponse.count;
          this.totalPages = paginatedResponse.total_pages;
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
