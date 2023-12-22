import { Component, OnInit } from '@angular/core';

import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexLegend,
  ApexGrid,
  ApexNoData,
} from 'ng-apexcharts';

// Servicios
import { DoctorStatisticsService } from 'src/app/core/services/statistics/doctor-statistics.service';

interface AppointmentsPerAge {
  age_group: string;
  count: number;
}

const DEFAULT_CHART_HEIGHT = 350;
const DEFAULT_COLUMN_WIDTH = '45%';
const DEFAULT_FONT_SIZE = '12px';
const SERIES_NAME = 'Citas';

/**
 * Componente para el gráfico citas por edad de los médicos.
 */
@Component({
  selector: 'app-doctor-appointments-age-columns-chart',
  templateUrl: './doctor-appointments-age-columns-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorAppointmentsAgeColumnsChartComponent implements OnInit {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries = [{ name: SERIES_NAME, data: [] }];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    height: DEFAULT_CHART_HEIGHT,
    type: 'bar',
  };

  /** Etiquetas del gráfico. */
  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  /** Configuración del gráfico. */
  public plotOptions: ApexPlotOptions = {
    bar: {
      columnWidth: DEFAULT_COLUMN_WIDTH,
      distributed: true,
    },
  };

  /** Eje X del gráfico. */
  public xaxis: ApexXAxis = {
    type: 'category',
    categories: [],
    labels: {
      style: {
        fontSize: DEFAULT_FONT_SIZE,
      },
    },
  };

  /** Configuración del grid. */
  public grid: ApexGrid = {
    show: true,
  };

  /** Leyenda del gráfico. */
  public legend: ApexLegend = {
    show: false,
  };

  /** Mensaje cuando no hay datos. */
  public noData: ApexNoData = {
    text: 'Cargando...',
  };

  constructor(private _doctorStatisticsService: DoctorStatisticsService) {}

  ngOnInit(): void {
    this._getDoctorAppointmentsPerAge();
  }

  /**
   * Obtiene y actualiza las estadísticas de citas de doctor por grupo de edad.
   * @private
   * @returns {void}
   */
  private _getDoctorAppointmentsPerAge(): void {
    this._doctorStatisticsService.getDoctorAppointmentsPerAge().subscribe({
      next: (response: AppointmentsPerAge[]) => {
        this.series[0].data = response.map(
          (item: AppointmentsPerAge) => item.count
        );
        const ranges = response.map(
          (item: AppointmentsPerAge) => item.age_group
        );
        this.xaxis.categories.push(...ranges);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
