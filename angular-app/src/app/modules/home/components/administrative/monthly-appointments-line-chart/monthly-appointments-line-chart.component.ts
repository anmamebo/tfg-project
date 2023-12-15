import { Component } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
} from 'ng-apexcharts';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics.service';

/**
 * Componente para el gráfico de citas mensuales.
 */
@Component({
  selector: 'app-monthly-appointments-line-chart',
  templateUrl: './monthly-appointments-line-chart.component.html',
  providers: [StatisticsService],
})
export class MonthlyAppointmentsLineChartComponent {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries = [{ name: 'Citas', data: [] }];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    type: 'area',
    stacked: false,
    height: 350,
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

  /** Mes. */
  public month: number;

  /** Año. */
  public year: number;

  /** Meses. */
  public months: { name: string; value: number }[] = [];

  /** Años. */
  public years: { name: string; value: number }[] = [];

  constructor(private _statisticsService: StatisticsService) {
    const date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    this._generateMonths();
    this._generateYears();

    this._getAppointmentsPerDay(this.month, this.year);
  }

  /**
   * Obtiene las citas por día.
   */
  private _getAppointmentsPerDay(month: number, year: number): void {
    this._statisticsService.getAppointmentsPerDay(month, year).subscribe({
      next: (result) => {
        const formattedData = this._formatDataForChart(result);
        this.series = [{ name: 'Citas', data: formattedData }];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * Formatea los datos para el gráfico.
   * @param data Datos de las citas por día.
   * @returns Datos formateados para el gráfico.
   */
  private _formatDataForChart(data: any[]): any[] {
    return data.map((item) => {
      const timestamp = new Date(item.date).getTime();
      return [timestamp, item.value];
    });
  }

  /**
   * Genera las opciones para los meses.
   */
  private _generateMonths() {
    for (let i = 1; i <= 12; i++) {
      const monthName = new Date(2000, i - 1, 1).toLocaleString('default', {
        month: 'long',
      });
      this.months.push({ name: monthName, value: i });
    }
  }

  /**
   * Genera las opciones para los años.
   */
  private _generateYears() {
    const startYear = 2023;
    const endYear = 2030;
    for (let i = startYear; i <= endYear; i++) {
      this.years.push({ name: i.toString(), value: i });
    }
  }

  /**
   * Evento que se ejecuta cuando se cambia el mes.
   * @param event Evento de cambio.
   */
  public onMonthChange(event: any) {
    const selectedMonth = event.target.value;
    this.month = selectedMonth;
    this._getAppointmentsPerDay(this.month, this.year);
  }

  /**
   * Evento que se ejecuta cuando se cambia el año.
   * @param event Evento de cambio.
   */
  public onYearChange(event: any) {
    const selectedYear = event.target.value;
    this.year = selectedYear;
    this._getAppointmentsPerDay(this.month, this.year);
  }
}
