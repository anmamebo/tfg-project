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
 * Componente para el gráfico citas por edad de los médicos.
 */
@Component({
  selector: 'app-doctor-appointments-age-columns-chart',
  templateUrl: './doctor-appointments-age-columns-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorAppointmentsAgeColumnsChartComponent {
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

    this._getDoctorAppointmentsPerAge();
  }

  /**
   * Obtiene las estadísticas de citas de los médicos por edad.
   */
  private _getDoctorAppointmentsPerAge(): void {
    this._doctorStatisticsService.getDoctorAppointmentsPerAge().subscribe({
      next: (response) => {
        const formattedData = this._formattedData(response);
        this.series[0].data = formattedData.map((item: any) => item.count);
        const ranges = formattedData.map((item: any) => item.range);
        this.xaxis.categories.push(...ranges);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * Formatea los datos para el gráfico.
   * @param data Datos a formatear.
   * @returns Datos formateados.
   */
  private _formattedData(data: any): any {
    const formattedData = Object.entries(data).map(([range, count]) => {
      const [startYear, endYear] = range.split('-').map(Number);
      const ageRange = `${new Date().getFullYear() - startYear}-${
        new Date().getFullYear() - endYear
      }`;

      return { range: ageRange, count };
    });

    return formattedData;
  }
}
