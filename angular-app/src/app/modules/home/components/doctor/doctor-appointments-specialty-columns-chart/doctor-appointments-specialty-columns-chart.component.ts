import { Component } from '@angular/core';

import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';

// Servicios
import { DoctorStatisticsService } from 'src/app/core/services/statistics/doctor-statistics.service';

/**
 * Componente para el gráfico citas por especialidad de los médicos.
 */
@Component({
  selector: 'app-doctor-appointments-specialty-columns-chart',
  templateUrl: './doctor-appointments-specialty-columns-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorAppointmentsSpecialtyColumnsChartComponent {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries;

  /** Configuración del gráfico. */
  public chart: ApexChart;

  /** Etiquetas del gráfico. */
  public dataLabels: ApexDataLabels;

  /** Configuración del gráfico. */
  public plotOptions: ApexPlotOptions;

  /** Eje X del gráfico. */
  public xaxis: ApexXAxis;

  /** Configuración del grid. */
  public grid: ApexGrid;

  /** Leyenda del gráfico. */
  public legend: ApexLegend;

  constructor(private _doctorStatisticsService: DoctorStatisticsService) {
    this.series = [{ name: 'Citas', data: [] }];
    this.chart = {
      height: 350,
      type: 'bar',
    };
    this.plotOptions = {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    };
    this.dataLabels = {
      enabled: false,
    };
    this.legend = {
      show: false,
    };
    this.grid = {
      show: true,
    };
    this.xaxis = {
      type: 'category',
      categories: [],
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    };

    this._getDoctorAppointmentsPerSpecialty();
  }

  /**
   * Obtiene las estadísticas de citas por especialidad de los doctores.
   */
  private _getDoctorAppointmentsPerSpecialty(): void {
    this._doctorStatisticsService
      .getDoctorAppointmentsPerSpecialty()
      .subscribe({
        next: (response) => {
          this.series[0].data = response.map((item: any) => item.value);
          const specialties = response.map((item: any) => item.specialty);
          this.xaxis.categories.push(...specialties);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
