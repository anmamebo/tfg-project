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
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

/**
 * Componente para el gráfico citas por edad.
 */
@Component({
  selector: 'app-appointments-age-column-chart',
  templateUrl: './appointments-age-column-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsAgeColumnChartComponent {
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

  constructor(private _statisticsService: StatisticsService) {
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

    this._getAppointmentsPerAge();
  }

  /**
   * Obtiene las estadísticas de citas por edad.
   */
  private _getAppointmentsPerAge(): void {
    this._statisticsService.getAppointmentsPerAge().subscribe({
      next: (response) => {
        this.series[0].data = response.map((item: any) => item.count);
        const ranges = response.map((item: any) => item.age_group);
        this.xaxis.categories.push(...ranges);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
