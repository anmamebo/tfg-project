import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbRoomsEditData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Room } from "src/app/core/models/room.model";


/**
 * Componente para la página de edición de una sala.
 */
@Component({
  selector: 'app-rooms-edit-page',
  templateUrl: './rooms-edit-page.component.html',
  styleUrls: ['./rooms-edit-page.component.scss']
})
export class RoomsEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar sala';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar una sala.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbRoomsEditData;

  /** Sala a editar. */
  public room: Room | null = null;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.room = this.route.snapshot.data['data']; // Obtiene los datos de la sala desde el resolver
  }

}
