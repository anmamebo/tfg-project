import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbDoctorsEditData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Doctor } from "src/app/core/models/doctor.model";


/**
 * Componente para la página de edición de un médico.
 */
@Component({
  selector: 'app-doctors-edit-page',
  templateUrl: './doctors-edit-page.component.html',
  styleUrls: ['./doctors-edit-page.component.scss']
})
export class DoctorsEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar médico';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un médico.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDoctorsEditData;

  /** Médico a editar. */
  public doctor: Doctor | null = null;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.doctor = this.route.snapshot.data['data']; // Obtiene los datos del médico desde el resolver
  }
}
