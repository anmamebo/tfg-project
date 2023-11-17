import { Component, OnInit } from '@angular/core';

// Servicios
import { PatientService } from "src/app/core/services/patient.service";

// Modelos
import { Patient } from 'src/app/core/models/patient.model';


/**
 * Componente que representa una tarjeta de listado de pacientes.
 */
@Component({
  selector: 'app-list-patients-card',
  templateUrl: './list-patients-card.component.html',
  styleUrls: ['./list-patients-card.component.scss'],
  providers: [PatientService],
})
export class ListPatientsCardComponent implements OnInit {
  /** Título de la tarjeta. */
  public titleCard: string = 'Listado de Pacientes';

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [
    { header: 'DNI', field: 'dni' },
    { header: 'Nº SEGURIDAD SOCIAL', field: 'social_security'},
    { header: 'NOMBRE', field: 'user.name' },
    { header: 'APELLIDOS', field: 'user.last_name' },
    { header: 'EMAIL', field: 'user.email' },
    { header: 'TELÉFONO', field: 'phone' },
  ]

  /** Pacientes que se mostrarán. */
  public patients: Patient[] | null = null;

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de pacientes totales. */
  public numPatients: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 10;

  /** Objeto con las urls de las acciones. */
  public actionsUrls = { 
    show: '/pacientes',
    edit: '/pacientes/editar',
    delete: ''
  }

  /** Término de búsqueda. */
  public search: string = '';

  constructor(
    private patientService: PatientService,
  ) { }

  ngOnInit(): void {
    this.getPatients(this.page);
  }

  /**
   * Va a la página indicada.
   * @param page Número de página al que se quiere ir.
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getPatients(this.page);
  }

  /**
   * Lanaza el evento de búsqueda.
   * @param searchTerm Término de búsqueda.
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getPatients(this.page, searchTerm);
  }

  /**
   * Lanaza el evento de cambio de número de resultados por página.
   * @param elementsPerPage Número de resultados por página.
   */
  public onEntriesPerPageChanged(elementsPerPage: number): void {
    this.numResults = elementsPerPage;
    this.getPatients(this.page);
  }

  /**
   * Obtiene los pacientes.
   * @param page Número de página que se quiere obtener.
   * @param searchTerm Término de búsqueda.
   */
  public getPatients(page: number, searchTerm?: string): void {
    // Comprueba si el término de búsqueda ha cambiado
    if (searchTerm != undefined && searchTerm != this.search) {      
      this.search = searchTerm ? searchTerm : '';
      page = 1;
      this.page = 1;
    } 

    this.patientService.getPatients(page, this.numResults, this.search).subscribe({
      next: (response: any) => {
        this.patients = response.results;
        this.numPatients = response.count;
        this.totalPages = Math.ceil(this.numPatients / this.numResults);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
