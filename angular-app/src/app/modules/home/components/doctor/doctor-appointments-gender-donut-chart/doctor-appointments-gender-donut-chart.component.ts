import { Component } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

// Servicios
import { DoctorStatisticsService } from 'src/app/core/services/doctor-statistics.service';

/**
 * Componente para el gráfico de género de las citas de los doctores.
 */
@Component({
  selector: 'app-doctor-appointments-gender-donut-chart',
  templateUrl: './doctor-appointments-gender-donut-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorAppointmentsGenderDonutChartComponent {
  /** Series del gráfico. */
  public series: ApexNonAxisChartSeries;

  /** Configuración del gráfico. */
  public chart: ApexChart;

  /** Configuración responsive del gráfico. */
  public responsive: ApexResponsive[];

  /** Etiquetas del gráfico. */
  public labels: any;

  /** Colores del gráfico. */
  public colors: string[];

  constructor(private _doctorStatisticsService: DoctorStatisticsService) {
    this.series = [1];
    this.colors = ['#435EBE', '#57CAEB'];
    this.chart = {
      width: '100%',
      height: 350,
      type: 'donut',
    };
    this.labels = [];
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

    this._getDoctorAppointmentsGenderStats();
  }

  /**
   * Obtiene las estadísticas de género de las citas de los doctores.
   */
  private _getDoctorAppointmentsGenderStats(): void {
    this._doctorStatisticsService.getDoctorAppointmentsPerGender().subscribe({
      next: (response) => {
        this.labels = response.map((item: any) =>
          this._getTextByValue(item.gender)
        );
        this.series = response.map((item: any) => item.value);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  /**
   * Retorna el texto correspondiente al valor.
   * @param value Valor.
   * @returns Texto correspondiente al valor.
   */
  private _getTextByValue(value: string): string {
    return value === 'M' ? 'Masculino' : 'Femenino';
  }
}
