import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsViewData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Patient } from "src/app/core/models/patient.model";

// Servicios
import { PatientService } from "src/app/core/services/patient.service";


/**
 * Componente para la página de visualización de un paciente
 */
@Component({
  selector: 'app-patients-view-page',
  templateUrl: './patients-view-page.component.html',
  styleUrls: ['./patients-view-page.component.scss'],
  providers: [PatientService]
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
    private patientService: PatientService
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      
      this.getPatient(id);
    });
  }

  /**
   * Obtiene un paciente por su id
   * @param id Id del paciente
   */
  getPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
