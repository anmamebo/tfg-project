import { Component, OnInit } from '@angular/core';
import { DoctorStatisticsService } from '@app/core/services/statistics/doctor-statistics.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexNoData,
  ApexPlotOptions,
  ApexXAxis,
} from 'ng-apexcharts';

interface AppointmentsPerSpecialty {
  specialty: string;
  value: number;
}

const DEFAULT_CHART_HEIGHT = 350;
const DEFAULT_COLUMN_WIDTH = '45%';
const DEFAULT_FONT_SIZE = '12px';
const SERIES_NAME = 'Citas';

/**
 * Componente para el gráfico citas por especialidad de los médicos.
 */
@Component({
  selector: 'app-doctor-appointments-specialty-columns-chart',
  templateUrl: './doctor-appointments-specialty-columns-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorAppointmentsSpecialtyColumnsChartComponent
  implements OnInit
{
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
    this._getDoctorAppointmentsPerSpecialty();
  }

  /**
   * Obtiene y actualiza las estadísticas de citas de doctor por especialidad.
   * @private
   * @returns {void}
   */
  private _getDoctorAppointmentsPerSpecialty(): void {
    this._doctorStatisticsService
      .getDoctorAppointmentsPerSpecialty()
      .subscribe({
        next: (response: AppointmentsPerSpecialty[]) => {
          this.series[0].data = response.map(
            (item: AppointmentsPerSpecialty) => item.value
          );
          const specialties = response.map(
            (item: AppointmentsPerSpecialty) => item.specialty
          );
          this.xaxis.categories.push(...specialties);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
