import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/core/models/doctor.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { DoctorService } from 'src/app/core/services/entities/doctor.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de visualización de los médicos
 * de un departamento
 */
@Component({
  selector: 'app-view-doctors-departments-card',
  templateUrl: './view-doctors-departments-card.component.html',
  providers: [DoctorService],
})
export class ViewDoctorsDepartmentsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Médicos';

  /** Identificador del departamento */
  @Input() public departmentId: string = '';

  /** Doctores que se visualizarán */
  public doctors: Doctor[] = [];

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [
    { header: 'NOMBRE', field: 'user.name' },
    { header: 'APELLIDOS', field: 'user.last_name' },
    { header: 'EMAIL', field: 'user.email' },
  ];

  /** Texto de información para la búsqueda. */
  public searchInfoTooltip =
    'Buscar médicos por id, nombre, apellidos, email o nº colegiado.';

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de pacientes totales. */
  public numDoctors: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 5;

  /** Término de búsqueda */
  public search: string = '';

  constructor(
    private _doctorService: DoctorService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getDoctorsByDepartmentId(this.page);
  }

  /**
   * Cambia la página de visualización y actualiza los doctores por departamento en la nueva página.
   * @param {number} page - El número de página al que se desea navegar.
   * @returns {void}
   * @public
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getDoctorsByDepartmentId(this.page);
  }

  /**
   * Maneja el evento de envío de búsqueda y actualiza la lista de doctores por departamento con el término de búsqueda proporcionado.
   * @param {string} searchTerm - Término de búsqueda para filtrar la lista de doctores.
   * @returns {void}
   * @public
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.search = searchTerm;
    this.page = 1;
    this.getDoctorsByDepartmentId(1);
  }

  /**
   * Obtiene la lista de doctores por departamento, opcionalmente filtrada por término de búsqueda y paginada.
   * @param {number} page - Número de página para la paginación.
   * @returns {void}
   * @public
   */
  public getDoctorsByDepartmentId(page: number): void {
    this._doctorService
      .getDoctorsByDepartmentId(this.departmentId, {
        page: page,
        paginate: true,
        searchTerm: this.search,
        pageSize: this.numResults,
      })
      .subscribe({
        next: (response: ListResponse<Doctor>) => {
          const paginatedResponse = response as PaginatedResponse<Doctor>;
          this.doctors = paginatedResponse.results;
          this.numDoctors = paginatedResponse.count;
          this.totalPages = Math.ceil(this.numDoctors / this.numResults);
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
