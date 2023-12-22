import { Component, OnInit } from '@angular/core';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

interface AverageWaitingTime {
  average_waiting_time_days: number;
}

/**
 * Componente para mostrar el tiempo medio de espera.
 */
@Component({
  selector: 'app-average-waiting-time-card',
  templateUrl: './average-waiting-time-card.component.html',
  providers: [StatisticsService],
})
export class AverageWaitingTimeCardComponent implements OnInit {
  /** Tiempo medio de espera. */
  public averageWaitingTime: string = '';

  constructor(private _statisticsService: StatisticsService) {}

  public ngOnInit(): void {
    this._getAverageWaitingTime();
  }

  /**
   * Obtiene y actualiza el tiempo promedio de espera.
   * @private
   * @returns {void}
   */
  private _getAverageWaitingTime(): void {
    this._statisticsService.getAverageWaitingTime().subscribe({
      next: (response: AverageWaitingTime) => {
        this.averageWaitingTime = response.average_waiting_time_days.toFixed(2);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
