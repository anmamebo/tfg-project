import { Component } from '@angular/core';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

/**
 * Componente para mostrar el tiempo medio de espera.
 */
@Component({
  selector: 'app-average-waiting-time-card',
  templateUrl: './average-waiting-time-card.component.html',
  providers: [StatisticsService],
})
export class AverageWaitingTimeCardComponent {
  /** Tiempo medio de espera. */
  public averageWaitingTime: number = 0;

  constructor(private _statisticsService: StatisticsService) {
    this._getAverageWaitingTime();
  }

  /**
   * Obtiene el tiempo medio de espera.
   */
  private _getAverageWaitingTime(): void {
    this._statisticsService.getAverageWaitingTime().subscribe({
      next: (response) => {
        this.averageWaitingTime = response.average_waiting_time_days.toFixed(2);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
