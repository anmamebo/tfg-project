import { Component, Input, OnInit } from '@angular/core';

// Servicios
import { DoctorService } from 'src/app/core/services/entities/doctor.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Doctor } from 'src/app/core/models/doctor.model';

/**
 * Componente que representa la tarjeta de visualización de los médicos
 * de un departamento
 */
@Component({
  selector: 'app-view-doctors-departments-card',
  templateUrl: './view-doctors-departments-card.component.html',
  providers: [DoctorService],
})
export class ViewDoctorsDepartmentsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Médicos';

  /** Identificador del departamento */
  @Input() public departmentId: string = '';

  /** Doctores que se visualizarán */
  public doctors: Doctor[] = [];

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [
    { header: 'NOMBRE', field: 'user.name' },
    { header: 'APELLIDOS', field: 'user.last_name' },
    { header: 'EMAIL', field: 'user.email' },
  ];

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de pacientes totales. */
  public numDoctors: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 5;

  /** Término de búsqueda */
  public search: string = '';

  constructor(
    private _doctorService: DoctorService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getDoctorsByDepartmentId(this.page);
  }

  /**
   * Va a la página indicada.
   * @param page Número de página al que se quiere ir.
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getDoctorsByDepartmentId(this.page);
  }

  /**
   * Lanza el evento de búsqueda.
   * @param searchTerm Término de búsqueda.
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getDoctorsByDepartmentId(this.page, searchTerm);
  }

  /**
   * Obtiene los doctores de un departamento.
   * @param page Número de página.
   */
  public getDoctorsByDepartmentId(page: number, searchTerm?: string): void {
    // Comprueba si el término de búsqueda ha cambiado
    if (searchTerm != undefined && searchTerm != this.search) {
      this.search = searchTerm || '';
      page = 1;
      this.page = 1;
    }

    this._doctorService
      .getDoctorsByDepartmentId(
        this.departmentId,
        page,
        this.numResults,
        this.search
      )
      .subscribe({
        next: (response: any) => {
          this.doctors = response.results;
          this.numDoctors = response.count;
          this.totalPages = Math.ceil(this.numDoctors / this.numResults);
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
