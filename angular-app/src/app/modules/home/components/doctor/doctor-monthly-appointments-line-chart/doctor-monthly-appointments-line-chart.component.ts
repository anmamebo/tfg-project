import { Component, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexNoData,
} from 'ng-apexcharts';

// Servicios
import { DoctorStatisticsService } from 'src/app/core/services/statistics/doctor-statistics.service';

interface AppointmentsPerDay {
  date: string;
  value: number;
}

const DEFAULT_CHART_HEIGHT = 350;

/**
 * Componente para el gráfico de citas mensuales.
 */
@Component({
  selector: 'app-doctor-monthly-appointments-line-chart',
  templateUrl: './doctor-monthly-appointments-line-chart.component.html',
  providers: [DoctorStatisticsService],
})
export class DoctorMonthlyAppointmentsLineChartComponent implements OnInit {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries = [{ name: 'Citas', data: [] }];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    type: 'area',
    stacked: false,
    height: DEFAULT_CHART_HEIGHT,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
  };

  /** Configuración de las etiquetas de datos. */
  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  /** Configuración de los marcadores. */
  public markers: ApexMarkers = {
    size: 0,
  };

  /** Configuración del relleno. */
  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  };

  /** Configuración del eje Y. */
  public yaxis: ApexYAxis = {
    min: 0,
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
    title: {
      text: 'Citas',
    },
  };

  /** Configuración del eje X. */
  public xaxis: ApexXAxis = {
    type: 'datetime',
  };

  /** Configuración del tooltip. */
  public tooltip: ApexTooltip = {
    shared: false,
    y: {
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
  };

  /** Mensaje cuando no hay datos. */
  public noData: ApexNoData = { text: 'Cargando...' };

  /** Mes. */
  public month: number;

  /** Año. */
  public year: number;

  /** Meses. */
  public months: { name: string; value: number }[] = [];

  /** Años. */
  public years: { name: string; value: number }[] = [];

  constructor(private _statisticsService: DoctorStatisticsService) {
    const date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  }

  ngOnInit(): void {
    this._generateMonths();
    this._generateYears();

    this._getAppointmentsPerDay(this.month, this.year);
  }

  /**
   * Obtiene y actualiza las estadísticas de citas por día para un mes y año específicos.
   * @private
   * @param {number} month - Mes para el que se obtienen las estadísticas de citas por día.
   * @param {number} year - Año para el que se obtienen las estadísticas de citas por día.
   * @returns {void}
   */
  private _getAppointmentsPerDay(month: number, year: number): void {
    this._statisticsService.getDoctorAppointmentsPerDay(month, year).subscribe({
      next: (response: AppointmentsPerDay[]) => {
        const formattedData = this._formatDataForChart(response);
        this.series = [{ name: 'Citas', data: formattedData }];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Formatea los datos de citas por día para su visualización en un gráfico.
   * @private
   * @param {AppointmentsPerDay[]} data - Datos de citas por día a formatear.
   * @returns {number[][]} Datos formateados para el gráfico, en un arreglo de arreglos.
   */
  private _formatDataForChart(data: AppointmentsPerDay[]): number[][] {
    return data.map((item: AppointmentsPerDay) => {
      const timestamp = new Date(item.date).getTime();
      return [timestamp, item.value];
    });
  }

  /**
   * Genera los nombres de los meses junto con sus valores correspondientes y los agrega a una lista.
   * @private
   * @returns {void}
   */
  private _generateMonths(): void {
    for (let i = 1; i <= 12; i++) {
      const monthName = new Date(2000, i - 1, 1).toLocaleString('default', {
        month: 'long',
      });
      this.months.push({ name: monthName, value: i });
    }
  }

  /**
   * Genera un rango de años y los agrega a una lista.
   * @private
   * @returns {void}
   */
  private _generateYears(): void {
    const startYear = 2023;
    const endYear = 2030;
    for (let i = startYear; i <= endYear; i++) {
      this.years.push({ name: i.toString(), value: i });
    }
  }

  /**
   * Maneja el cambio de mes y actualiza las estadísticas de citas por día.
   * @public
   * @param {Event} event - El evento que desencadena el cambio de mes.
   * @returns {void}
   */
  public onMonthChange(event: Event): void {
    const selectedMonth = (event.target as HTMLInputElement)?.value;
    if (selectedMonth) {
      this.month = parseInt(selectedMonth, 10);
      this._getAppointmentsPerDay(this.month, this.year);
    }
  }

  /**
   * Maneja el cambio de año y actualiza las estadísticas de citas por día.
   * @public
   * @param {Event} event - El evento que desencadena el cambio de año.
   * @returns {void}
   */
  public onYearChange(event: Event): void {
    const selectedYear = (event.target as HTMLInputElement)?.value;
    if (selectedYear) {
      this.year = parseInt(selectedYear, 10);
      this._getAppointmentsPerDay(this.month, this.year);
    }
  }
}
