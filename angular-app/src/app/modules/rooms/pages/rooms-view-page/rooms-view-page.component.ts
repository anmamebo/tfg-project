import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbRoomsViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { RoomService } from 'src/app/core/services/room.service';

// Modelos
import { Room } from 'src/app/core/models/room.model';

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

  /** Sala que se visualizará */
  public room: Room | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.room = this.route.snapshot.data['data']; // Obtiene los datos de la sala desde el resolver
  }

  /**
   * Actualiza los datos de la sala
   */
  onRefreshRoom(): void {
    this.roomService.getItemById(this.room!.id).subscribe({
      next: (room: Room) => {
        this.room = room;
      },
    });
  }
}
