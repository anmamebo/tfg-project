import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbRoomsViewData } from 'src/app/core/constants/breadcrumb-data.constants';
import { ROLES } from 'src/app/core/constants/roles.constants';
import { Room } from 'src/app/core/models/room.interface';
import { RoomService } from 'src/app/core/services/entities/room.service';

/**
 * Componente para la página de visualización de una sala
 */
@Component({
  selector: 'app-rooms-view-page',
  templateUrl: './rooms-view-page.component.html',
  providers: [RoomService],
})
export class RoomsViewPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Visualizar sala';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar una sala.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbRoomsViewData;

  /** Roles que pueden visualizar los botones de acciones */
  public buttonsRoles: string[] = [ROLES.ADMIN];

  /** Sala que se visualizará */
  public room: Room | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.room = this._route.snapshot.data['data']; // Obtiene los datos de la sala desde el resolver
  }

  /**
   * Actualiza los datos de la sala actual a partir de su ID.
   * @public
   * @returns {void}
   */
  onRefreshRoom(): void {
    if (!this.room) return;

    this._roomService.getItemById(this.room.id).subscribe({
      next: (room: Room) => {
        this.room = room;
      },
    });
  }
}
