import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { PatientService } from 'src/app/core/services/patient.service';

// Modelos
import { Patient } from 'src/app/core/models/patient.model';

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
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patient = this.route.snapshot.data['data']; // Obtiene los datos del paciente desde el resolver

    if (this.patient && this.patient.user) {
      this.pageTitle += ` - ${this.patient.user.name} ${this.patient.user.last_name}`;
    }
  }

  /**
   * Actualiza los datos del paciente
   */
  onRefreshPatient(): void {
    this.patientService.getItemById(this.patient!.id).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
      },
    });
  }
}
