import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexNoData,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { DoctorStatisticsService } from 'src/app/core/services/statistics/doctor-statistics.service';

interface AppointmentsPerGender {
  gender: string;
  value: number;
}

const DEFAULT_CHART_HEIGHT = 350;
const DEFAULT_CHART_WIDTH = '100%';
const DEFAULT_RESPONSIVE_CHART_WIDTH = 200;
const DEFAULT_RESPONSIVE_BREAKPOINT = 480;

/**
 * Componente para el gráfico de género de las citas de los doctores.
 */
@Component({
  selector: 'app-doctor-appointments-gender-donut-chart',
  templateUrl: './doctor-appointments-gender-donut-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorAppointmentsGenderDonutChartComponent implements OnInit {
  /** Series del gráfico. */
  public series: ApexNonAxisChartSeries = [1];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    width: DEFAULT_CHART_WIDTH,
    height: DEFAULT_CHART_HEIGHT,
    type: 'donut',
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

  /** Colores del gráfico. */
  public colors: string[] = ['#435EBE', '#57CAEB'];

  /** Texto cuando no hay datos. */
  public noData: ApexNoData = { text: 'No hay datos' };

  constructor(private _doctorStatisticsService: DoctorStatisticsService) {}

  ngOnInit(): void {
    this._getDoctorAppointmentsGenderStats();
  }

  /**
   * Obtiene y actualiza las estadísticas de citas de doctor por género.
   * @private
   * @returns {void}
   */
  private _getDoctorAppointmentsGenderStats(): void {
    this._doctorStatisticsService.getDoctorAppointmentsPerGender().subscribe({
      next: (response: AppointmentsPerGender[]) => {
        this.labels = response.map((item: AppointmentsPerGender) =>
          this._getTextByValue(item.gender)
        );
        this.series = response.map((item: AppointmentsPerGender) => item.value);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  /**
   * Obtiene el texto asociado a un valor de género.
   * @private
   * @param {string} value - Valor del género ('M' para masculino, 'F' para femenino).
   * @returns {string} El texto asociado al valor de género.
   */
  private _getTextByValue(value: string): string {
    return value === 'M' ? 'Masculino' : 'Femenino';
  }
}
