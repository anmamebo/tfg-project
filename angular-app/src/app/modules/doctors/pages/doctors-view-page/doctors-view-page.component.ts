import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbDoctorsViewData } from 'src/app/core/constants/breadcrumb-data.constants';
import { Doctor } from 'src/app/core/models/doctor.interface';
import { DoctorService } from 'src/app/core/services/entities/doctor.service';

/**
 * Componente para la página de visualización de un médico
 */
@Component({
  selector: 'app-doctors-view-page',
  templateUrl: './doctors-view-page.component.html',
  providers: [DoctorService],
})
export class DoctorsViewPageComponent {
  /** Título de la página */
  public pageTitle: string = 'Visualizar';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar un médico.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbDoctorsViewData;

  /** Médico que se visualizará */
  public doctor: Doctor | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _doctorService: DoctorService
  ) {
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
  onRefreshDoctor(): void {
    if (!this.doctor) return;

    this._doctorService.getItemById(this.doctor.id).subscribe({
      next: (doctor: Doctor) => {
        this.doctor = doctor;
      },
    });
  }
}
