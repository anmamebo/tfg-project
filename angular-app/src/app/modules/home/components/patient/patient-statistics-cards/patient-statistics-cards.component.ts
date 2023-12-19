import { Component, OnInit } from '@angular/core';

// Servicios
import { PatientStatisticsService } from 'src/app/core/services/statistics/patient-statistics.service';

@Component({
  selector: 'app-patient-statistics-cards',
  templateUrl: './patient-statistics-cards.component.html',
  providers: [PatientStatisticsService],
})
export class PatientStatisticsCardsComponent implements OnInit {
  /** Número de citas completadas. */
  public appointments: number = 0;

  /** Número de citas pendientes */
  public nextAppointments: number = 0;

  /** Número de tratamientos activos */
  public activeTreatments: number = 0;

  /** Tiempo medio por cita */
  public averageTimePerAppointment: string = '';

  constructor(private _patientStatisticsService: PatientStatisticsService) {}

  public ngOnInit(): void {
    this._getPatientOverallStats();
  }

  /**
   * Obtiene las estadísticas generales.
   */
  private _getPatientOverallStats(): void {
    this._patientStatisticsService.getPatientOverallStats().subscribe({
      next: (response: any) => {
        this.appointments = response.total_appointments;
        this.nextAppointments = response.next_appointments;
        this.activeTreatments = response.active_treatments;
        this.averageTimePerAppointment = response.average_time_per_appointment;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
