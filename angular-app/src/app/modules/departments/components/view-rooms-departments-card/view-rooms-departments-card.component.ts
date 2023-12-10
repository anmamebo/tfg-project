import { Component, Input, OnInit } from '@angular/core';

// Servicios
import { RoomService } from 'src/app/core/services/room.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Room } from 'src/app/core/models/room.model';

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
    private roomService: RoomService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getRoomsByDepartmentId(this.page);
  }

  /**
   * Va a la página indicada.
   * @param page Número de página al que se quiere ir.
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getRoomsByDepartmentId(this.page);
  }

  /**
   * Lanza el evento de búsqueda.
   * @param searchTerm Término de búsqueda.
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getRoomsByDepartmentId(this.page, searchTerm);
  }

  /**
   * Obtiene las salas de un departamento.
   * @param page Número de página al que se quiere ir.
   */
  public getRoomsByDepartmentId(page: number, searchTerm?: string): void {
    // Comprueba si el término de búsqueda ha cambiado
    if (searchTerm != undefined && searchTerm != this.search) {
      this.search = searchTerm || '';
      page = 1;
      this.page = 1;
    }

    this.roomService
      .getRoomsByDepartmentId(
        this.departmentId,
        page,
        this.numResults,
        this.search
      )
      .subscribe({
        next: (response: any) => {
          this.rooms = response.results;
          this.numRooms = response.count;
          this.totalPages = Math.ceil(this.numRooms / this.numResults);
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }
}
