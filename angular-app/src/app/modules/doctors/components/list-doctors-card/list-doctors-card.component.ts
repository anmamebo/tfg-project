import { Component, OnInit } from '@angular/core';

// Servicios
import { DoctorService } from "src/app/core/services/doctor.service";
import { NotificationService } from "src/app/core/services/notification.service";

// Modelos
import { Doctor } from 'src/app/core/models/doctor.model';


/**
 * Componente que representa una tarjeta de listado de médicos.
 */
@Component({
  selector: 'app-list-doctors-card',
  templateUrl: './list-doctors-card.component.html',
  styleUrls: ['./list-doctors-card.component.scss'],
  providers: [DoctorService, NotificationService],
})
export class ListDoctorsCardComponent implements OnInit {
  /** Título de la tarjeta. */
  public titleCard: string = 'Listado de Médicos';

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [
    { header: 'Nº COLEGIADO', field: 'collegiate_number' },
    { header: 'NOMBRE', field: 'user.name' },
    { header: 'APELLIDOS', field: 'user.last_name' },
    { header: 'EMAIL', field: 'user.email' },
  ]

  /** Médicos que se mostrarán. */
  public doctors: Doctor[] | null = null;

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de médicos totales. */
  public numDoctors: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 10;

  /** Objeto con las urls de las acciones. */
  public actionsUrls = { 
    show: '/medicos',
    edit: '/medicos/editar',
    delete: ''
  }

  /** Término de búsqueda. */
  public search: string = '';

  constructor(
    private doctorService: DoctorService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getDoctors(this.page);
  }

  /**
   * Va a la página indicada.
   * @param page Número de página al que se quiere ir.
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getDoctors(this.page);
  }

  /**
   * Lanaza el evento de búsqueda.
   * @param searchTerm Término de búsqueda.
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getDoctors(this.page, searchTerm);
  }

  /**
   * Lanaza el evento de cambio de número de resultados por página.
   * @param elementsPerPage Número de resultados por página.
   */
  public onEntriesPerPageChanged(elementsPerPage: number): void {
    this.numResults = elementsPerPage;
    this.page = 1;
    this.getDoctors(this.page);
  }

  /**
   * Obtiene los médicos.
   * @param page El número de página que se quiere obtener.
   * @param searchTerm Término de búsqueda.
   */
  public getDoctors(page: number, searchTerm?: string): void {
    // Comprueba si el término de búsqueda ha cambiado
    if (searchTerm != undefined && searchTerm != this.search) {      
      this.search = searchTerm ? searchTerm : '';
      page = 1;
      this.page = 1;
    } 

    this.doctorService.getDoctors(page, this.numResults, this.search).subscribe({
      next: (response: any) => { 
        this.doctors = response.results;
        this.numDoctors = response.count;
        this.totalPages = Math.ceil(this.numDoctors / this.numResults);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  /**
   * Elimina un médico.
   * @param id El identificador del médico.
   */
  public deleteDoctor(id: string): void {
    this.notificationService.showConfirmDeleteDialog(() => {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.getDoctors(this.page);
        },
        error: () => {
          this.notificationService.showErrorToast('No se ha podido eliminar el médico');
        }
      })
    });
  }
}
