import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsEditData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { PatientService } from 'src/app/core/services/patient.service';

// Modelos
import { Patient } from 'src/app/core/models/patient.model';

/**
 * Componente para la página de edición de un paciente.
 */
@Component({
  selector: 'app-patients-edit-page',
  templateUrl: './patients-edit-page.component.html',
  providers: [PatientService],
})
export class PatientsEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un paciente.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsEditData;

  /** Paciente a editar. */
  public patient: Patient | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patient = this._route.snapshot.data['data']; // Obtiene los datos del paciente desde el resolver

    if (this.patient && this.patient.user) {
      this.pageTitle += ` - ${this.patient.user.name} ${this.patient.user.last_name}`;
    }
  }

  /**
   * Actualiza los datos del paciente.
   */
  public onRefreshPatient(): void {
    if (!this.patient) return;

    this._patientService.getItemById(this.patient.id).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
        this._refreshTitle();
      },
    });
  }

  /**
   * Actualiza el título de la página.
   */
  private _refreshTitle(): void {
    let title = this.pageTitle.split(' - ');

    if (this.patient && this.patient.user) {
      this.pageTitle = `${title[0]} - ${this.patient.user.name} ${this.patient.user.last_name}`;
    }
  }
}
