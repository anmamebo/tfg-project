import { Component, OnInit } from '@angular/core';

// Servicios
import { DoctorStatisticsService } from 'src/app/core/services/statistics/doctor-statistics.service';

interface Statistics {
  total_appointments_completed: number;
  total_treatments_prescribed: number;
  total_duration_in_hms: string;
  average_time_per_patient: string;
}

/**
 * Componente para mostrar las estadísticas generales del médico.
 */
@Component({
  selector: 'app-doctor-statistics-cards',
  templateUrl: './doctor-statistics-cards.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorStatisticsCardsComponent implements OnInit {
  /** Número de citas completadas. */
  public completedAppointments: number = 0;

  /** Número de tratamientos recetados */
  public prescribedTreatments: number = 0;

  /** Tiempo trabajado */
  public workedTime: string = '';

  /** Tiempo medio por paciente */
  public averageTimePerPatient: string = '';

  constructor(private _doctorStatisticsService: DoctorStatisticsService) {}

  public ngOnInit(): void {
    this._getDoctorOverallStats();
  }

  /**
   * Obtiene y actualiza las estadísticas generales del médico.
   * @private
   * @returns {void}
   */
  private _getDoctorOverallStats(): void {
    this._doctorStatisticsService.getDoctorOverallStats().subscribe({
      next: (response: Statistics) => {
        this.completedAppointments = response.total_appointments_completed;
        this.prescribedTreatments = response.total_treatments_prescribed;
        this.workedTime = response.total_duration_in_hms;
        this.averageTimePerPatient = response.average_time_per_patient;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
