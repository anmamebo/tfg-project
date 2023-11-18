import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { breadcrumbPatientsEditData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Patient } from "src/app/core/models/patient.model";

// Servicios
import { PatientService } from "src/app/core/services/patient.service";


/**
 * Componente para la página de edición de un paciente.
 */
@Component({
  selector: 'app-patients-edit-page',
  templateUrl: './patients-edit-page.component.html',
  styleUrls: ['./patients-edit-page.component.scss'],
  providers: [PatientService]
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
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      
      this.getPatient(id);
    });
  }

  /**
   * Obtiene un paciente por su `id`.
   * @param id `id` del paciente a obtener.
   */
  getPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.router.navigate(['**'], { replaceUrl: true }); 
        } else {          
          console.error(error);
        }
      }
    });
  }
}
