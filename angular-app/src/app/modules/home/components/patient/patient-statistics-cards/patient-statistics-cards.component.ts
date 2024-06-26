import { Component, OnInit } from '@angular/core';
import { PatientStatisticsService } from '@app/core/services/statistics/patient-statistics.service';

interface Statistics {
  next_appointments: number;
  active_treatments: number;
  total_appointments: number;
  average_time_per_appointment: string;
}

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
   * Obtiene y actualiza las estadísticas generales del paciente.
   * @private
   * @returns {void}
   */
  private _getPatientOverallStats(): void {
    this._patientStatisticsService.getPatientOverallStats().subscribe({
      next: (response: Statistics) => {
        this.appointments = response.total_appointments;
        this.nextAppointments = response.next_appointments;
        this.activeTreatments = response.active_treatments;
        this.averageTimePerAppointment = response.average_time_per_appointment;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
