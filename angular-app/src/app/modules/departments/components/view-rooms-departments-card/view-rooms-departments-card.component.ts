import { Component, Input, OnInit } from '@angular/core';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { Room } from 'src/app/core/models/room.interface';
import { RoomService } from 'src/app/core/services/entities/room.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de visualización de las salas
 * de un departamento
 */
@Component({
  selector: 'app-view-rooms-departments-card',
  templateUrl: './view-rooms-departments-card.component.html',
  providers: [RoomService],
})
export class ViewRoomsDepartmentsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Salas';

  /** Identificador del departamento */
  @Input() public departmentId: string = '';

  /** Salas que se visualizarán */
  public rooms: Room[] = [];

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [
    { header: 'NOMBRE', field: 'name' },
    { header: 'TIPO', field: 'type' },
    { header: 'UBICACIÓN', field: 'location' },
    { header: 'CAPACIDAD', field: 'capacity' },
  ];

  /** Texto de información para la búsqueda. */
  public searchInfoTooltip =
    'Buscar salas por id, nombre, tipo, localización, nombre de departamento o capacidad.';

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de pacientes totales. */
  public numRooms: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 5;

  /** Término de búsqueda */
  public search: string = '';

  constructor(
    private _roomService: RoomService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getRoomsByDepartmentId();
  }

  /**
   * Cambia la página de visualización y actualiza las habitaciones por departamento en la nueva página.
   * @param {number} page - El número de página al que se desea navegar.
   * @returns {void}
   * @public
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getRoomsByDepartmentId();
  }

  /**
   * Maneja el evento de envío de búsqueda y actualiza la lista de habitaciones por departamento con el término de búsqueda proporcionado.
   * @param {string} searchTerm - Término de búsqueda para filtrar la lista de habitaciones.
   * @returns {void}
   * @public
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.search = searchTerm;
    this.page = 1;
    this.getRoomsByDepartmentId();
  }

  /**
   * Obtiene la lista de habitaciones por departamento, opcionalmente filtrada por término de búsqueda y paginada.
   * @returns {void}
   * @public
   */
  public getRoomsByDepartmentId(): void {
    this._roomService
      .getRoomsByDepartmentId(this.departmentId, {
        page: this.page,
        paginate: true,
        searchTerm: this.search,
        pageSize: this.numResults,
      })
      .subscribe({
        next: (response: ListResponse<Room>) => {
          const paginatedResponse = response as PaginatedResponse<Room>;
          this.rooms = paginatedResponse.results;
          this.numRooms = paginatedResponse.count;
          this.totalPages = paginatedResponse.total_pages;
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
