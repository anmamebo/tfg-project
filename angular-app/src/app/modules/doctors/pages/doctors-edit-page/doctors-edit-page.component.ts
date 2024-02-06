import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbDoctorsEditData } from 'src/app/core/constants/breadcrumb-data.constants';

// Servicios
import { DoctorService } from 'src/app/core/services/entities/doctor.service';

// Modelos
import { Doctor } from 'src/app/core/models/doctor.interface';

/**
 * Componente para la página de edición de un médico.
 */
@Component({
  selector: 'app-doctors-edit-page',
  templateUrl: './doctors-edit-page.component.html',
  providers: [DoctorService],
})
export class DoctorsEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un médico.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDoctorsEditData;

  /** Médico a editar. */
  public doctor: Doctor | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.doctor = this._route.snapshot.data['data']; // Obtiene los datos del médico desde el resolver

    if (this.doctor && this.doctor.user) {
      this.pageTitle += ` - ${this.doctor.user.name} ${this.doctor.user.last_name}`;
    }
  }

  /**
   * Actualiza la información del médico actual volviendo a obtener sus datos desde el servicio.
   * Si no hay médico definido, no se realiza ninguna acción.
   * @returns {void}
   * @public
   */
  public onRefreshDoctor(): void {
    if (!this.doctor) {
      return;
    }
    this._doctorService.getItemById(this.doctor.id).subscribe({
      next: (doctor: Doctor) => {
        this.doctor = doctor;
        this._refreshTitle();
      },
    });
  }

  /**
   * Actualiza el título de la página concatenando el nombre completo del médico, si está disponible.
   * Es un método privado utilizado para refrescar el título de la página.
   * @returns {void}
   * @private
   */
  private _refreshTitle(): void {
    let title = this.pageTitle.split(' - ');
    if (this.doctor && this.doctor.user) {
      this.pageTitle = `${title[0]} - ${this.doctor.user.name} ${this.doctor.user.last_name}`;
    }
  }
}
