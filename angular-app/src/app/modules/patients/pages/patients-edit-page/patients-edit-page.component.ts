import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsEditData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Patient } from "src/app/core/models/patient.model";


/**
 * Componente para la página de edición de un paciente.
 */
@Component({
  selector: 'app-patients-edit-page',
  templateUrl: './patients-edit-page.component.html',
  styleUrls: ['./patients-edit-page.component.scss'],
})
export class PatientsEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar paciente';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un paciente.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsEditData;

  /** Paciente a editar. */
  public patient: Patient | null = null;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.patient = this.route.snapshot.data['data']; // Obtiene los datos del paciente desde el resolver
  }
}
