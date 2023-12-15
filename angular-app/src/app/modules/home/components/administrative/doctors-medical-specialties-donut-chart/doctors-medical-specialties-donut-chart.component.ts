import { Component } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics.service';

/**
 * Componente para el gráfico de especialidades médicas de los doctores.
 */
@Component({
  selector: 'app-doctors-medical-specialties-donut-chart',
  templateUrl: './doctors-medical-specialties-donut-chart.component.html',
  providers: [StatisticsService],
})
export class DoctorsMedicalSpecialtiesDonutChartComponent {
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

  constructor(private _statisticsService: StatisticsService) {
    this.series = [1];
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

    this._getDoctorsMedicalSpecialtiesStats();
  }

  /**
   * Obtiene las estadísticas de especialidades médicas de los doctores.
   */
  private _getDoctorsMedicalSpecialtiesStats(): void {
    this._statisticsService.getMedicalSpecialtyDoctorCount().subscribe({
      next: (response) => {
        this.labels = response.map((item: any) => item.name);
        this.series = response.map((item: any) => item.doctor_count);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
