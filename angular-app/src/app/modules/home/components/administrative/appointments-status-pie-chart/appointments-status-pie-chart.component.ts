import { Component, OnInit } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexLegend,
} from 'ng-apexcharts';

// Constantes
import { STATUS_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/status-appointment-options.constants';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

interface AppointmentsPerStatus {
  status: string;
  count: number;
}

const DEFAULT_CHART_HEIGHT = 350;
const DEFAULT_CHART_WIDTH = '100%';
const DEFAULT_RESPONSIVE_CHART_WIDTH = 200;
const DEFAULT_RESPONSIVE_BREAKPOINT = 480;
const COLORS = [
  '#FF4560',
  '#00E396',
  '#FEB019',
  '#775DD0',
  '#546E7A',
  '#26a69a',
  '#008FFB',
];

/**
 * Componente para el gráfico de citas por estado.
 */
@Component({
  selector: 'app-appointments-status-pie-chart',
  templateUrl: './appointments-status-pie-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsStatusPieChartComponent implements OnInit {
  /** Series del gráfico. */
  public series: ApexNonAxisChartSeries = [1];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    width: DEFAULT_CHART_WIDTH,
    height: DEFAULT_CHART_HEIGHT,
    type: 'pie',
  };

  /** Configuración responsive del gráfico. */
  public responsive: ApexResponsive[] = [
    {
      breakpoint: DEFAULT_RESPONSIVE_BREAKPOINT,
      options: {
        chart: {
          width: DEFAULT_RESPONSIVE_CHART_WIDTH,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ];

  /** Etiquetas del gráfico. */
  public labels: string[] = [];

  /** Configuración de la leyenda. */
  public legend: ApexLegend = {
    position: 'right',
  };

  /** Colores del gráfico. */
  public colors: string[] = COLORS;

  /** Texto cuando no hay datos. */
  public noData = { text: 'Cargando...' };

  constructor(private _statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this._getAppointmentsStatusStats();
  }

  /**
   * Obtiene y actualiza las estadísticas de citas por estado.
   * @private
   * @returns {void}
   */
  private _getAppointmentsStatusStats(): void {
    this._statisticsService.getAppointmentsPerStatus().subscribe({
      next: (response: AppointmentsPerStatus[]) => {
        this.series = response.map((item: AppointmentsPerStatus) => item.count);
        this.labels = response
          .map((item: AppointmentsPerStatus) =>
            this._getTextByValue(item.status)
          )
          .sort();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Obtiene el texto asociado a un valor dado, si existe.
   * @private
   * @param {string} value - Valor del cual se busca el texto asociado.
   * @returns {string} El texto asociado al valor, o el valor mismo si no se encuentra asociado.
   */
  private _getTextByValue(value: string): string {
    const status = STATUS_APPOINTMENT_OPTIONS.find(
      (status) => status.value === value
    );

    return status ? status.text : value;
  }
}
