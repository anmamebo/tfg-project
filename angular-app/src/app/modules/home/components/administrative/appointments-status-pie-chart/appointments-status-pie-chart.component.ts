import { Component } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexLegend,
} from 'ng-apexcharts';

// Constantes
import { STATUS_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/status-appointment-options.constants';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics.service';

/**
 * Componente para el gráfico de citas por estado.
 */
@Component({
  selector: 'app-appointments-status-pie-chart',
  templateUrl: './appointments-status-pie-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsStatusPieChartComponent {
  /** Series del gráfico. */
  public series: ApexNonAxisChartSeries = [1];

  /** Configuración del gráfico. */
  public chart: ApexChart;

  /** Configuración responsive del gráfico. */
  public responsive: ApexResponsive[];

  /** Etiquetas del gráfico. */
  public labels: any;

  /** Configuración de la leyenda. */
  public legend: ApexLegend;

  /** Colores del gráfico. */
  public colors: string[];

  constructor(private _statisticsService: StatisticsService) {
    this._getAppointmentsStatusStats();

    this.colors = [
      '#FF4560',
      '#00E396',
      '#FEB019',
      '#775DD0',
      '#546E7A',
      '#26a69a',
      '#008FFB',
    ];

    this.chart = {
      width: '100%',
      height: 350,
      type: 'pie',
    };

    this.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];

    this.legend = {
      position: 'right',
    };
  }

  /**
   * Obtiene las estadísticas de citas por estado.
   */
  private _getAppointmentsStatusStats(): void {
    this._statisticsService.getAppointmentsPerStatus().subscribe({
      next: (data: any) => {
        this.series = data.map((item: any) => item.count);
        this.labels = data.map((item: any) =>
          this._getTextByValue(item.status)
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * Obtiene el texto de un valor.
   * @param value valor
   * @returns texto del valor
   */
  private _getTextByValue(value: string): string {
    const status = STATUS_APPOINTMENT_OPTIONS.find(
      (status) => status.value === value
    );

    return status ? status.text : value;
  }
}
