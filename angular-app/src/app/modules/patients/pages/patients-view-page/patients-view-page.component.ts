import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsViewData } from 'src/app/core/constants/breadcrumb-data.constants';

// Servicios
import { PatientService } from 'src/app/core/services/entities/patient.service';

// Modelos
import { Patient } from 'src/app/core/models/patient.interface';

/**
 * Componente para la página de visualización de un paciente
 */
@Component({
  selector: 'app-patients-view-page',
  templateUrl: './patients-view-page.component.html',
  providers: [PatientService],
})
export class PatientsViewPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Visualizar';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar un paciente.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbPatientsViewData;

  /** Paciente que se visualizará */
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
   * Actualiza los datos del paciente actualizando la información del paciente desde el servicio.
   * Emite un evento para actualizar la información del paciente y el título después de la actualización.
   * @returns {void}
   * @public
   */
  public onRefreshPatient(): void {
    if (!this.patient) return;

    this._patientService.getItemById(this.patient.id).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
      },
    });
  }
}
