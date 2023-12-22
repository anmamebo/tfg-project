import { Component, OnInit } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

interface DoctorsPerMedicalSpecialty {
  name: string;
  doctor_count: number;
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
 * Componente para el gráfico de especialidades médicas de los doctores.
 */
@Component({
  selector: 'app-doctors-medical-specialties-donut-chart',
  templateUrl: './doctors-medical-specialties-donut-chart.component.html',
  providers: [StatisticsService],
})
export class DoctorsMedicalSpecialtiesDonutChartComponent implements OnInit {
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
  public colors: string[] = COLORS;

  constructor(private _statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this._getDoctorsMedicalSpecialtiesStats();
  }

  /**
   * Obtiene y actualiza las estadísticas de la cantidad de doctores por especialidad médica.
   * @private
   * @returns {void}
   */
  private _getDoctorsMedicalSpecialtiesStats(): void {
    this._statisticsService.getMedicalSpecialtyDoctorCount().subscribe({
      next: (response: DoctorsPerMedicalSpecialty[]) => {
        this.labels = response.map(
          (item: DoctorsPerMedicalSpecialty) => item.name
        );
        this.series = response.map(
          (item: DoctorsPerMedicalSpecialty) => item.doctor_count
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
