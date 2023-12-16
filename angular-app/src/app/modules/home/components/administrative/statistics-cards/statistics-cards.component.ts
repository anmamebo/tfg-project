import { Component, OnInit } from '@angular/core';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics.service';

/**
 * Componente para mostrar las estadísticas generales de la aplicación.
 */
@Component({
  selector: 'app-statistics-cards',
  templateUrl: './statistics-cards.component.html',
  providers: [StatisticsService],
})
export class StatisticsCardsComponent implements OnInit {
  /** Número total de pacientes. */
  public totalPatients: number = 0;

  /** Número total de doctores. */
  public totalDoctors: number = 0;

  /** Número total de citas. */
  public totalAppointments: number = 0;

  /** Número total de departamentos. */
  public totalDepartments: number = 0;

  constructor(private _statisticsService: StatisticsService) {}

  public ngOnInit(): void {
    this._getOverallStats();
  }

  /**
   * Obtiene las estadísticas generales.
   */
  private _getOverallStats(): void {
    this._statisticsService.getOverallStats().subscribe({
      next: (response: any) => {
        this.totalPatients = response.total_patients;
        this.totalDoctors = response.total_doctors;
        this.totalAppointments = response.total_appointments;
        this.totalDepartments = response.total_departments;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
