import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsViewData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Patient } from "src/app/core/models/patient.model";


/**
 * Componente para la página de visualización de un paciente
 */
@Component({
  selector: 'app-patients-view-page',
  templateUrl: './patients-view-page.component.html',
  styleUrls: ['./patients-view-page.component.scss'],
})
export class PatientsViewPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Visualizar paciente';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar un paciente.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbPatientsViewData;

  /** Paciente que se visualizará */
  public patient: Patient | null = null;

  constructor(
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit(): void {
    this.patient = this.route.snapshot.data['data']; // Obtiene los datos del paciente desde el resolver
  }
}
