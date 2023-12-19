import { Component } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

/**
 * Componente para el gráfico de citas por día y género.
 */
@Component({
  selector: 'app-appointments-gender-area-spline-chart',
  templateUrl: './appointments-gender-area-spline-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsGenderAreaSplineChartComponent {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries;

  /** Configuración del gráfico. */
  public chart: ApexChart;

  /** Configuración del eje Y. */
  public yaxis: ApexYAxis;

  /** Configuración del eje X. */
  public xaxis: ApexXAxis;

  /** Configuración del relleno. */
  public stroke: ApexStroke;

  /** Configuración del tooltip. */
  public tooltip: ApexTooltip;

  /** Configuración de las etiquetas de datos. */
  public dataLabels: ApexDataLabels;

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

    this.series = [
      {
        name: 'Masculino',
        data: [],
      },
      {
        name: 'Femenino',
        data: [],
      },
    ];
    this.chart = {
      height: 350,
      type: 'area',
    };
    this.dataLabels = {
      enabled: false,
    };
    this.stroke = {
      curve: 'smooth',
    };
    this.yaxis = {
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
    this.xaxis = {
      type: 'datetime',
      categories: [],
    };
    this.tooltip = {
      x: {
        format: 'dd/MM/yy',
      },
    };

    this._getAppointmentsPerDayAndGender(12, 2023);
  }

  /**
   * Obtiene las estadísticas de citas por día y género.
   * @param month mes
   * @param year año
   */
  private _getAppointmentsPerDayAndGender(month: number, year: number): void {
    this._statisticsService
      .getAppointmentsPerDayAndGender(month, year)
      .subscribe({
        next: (result) => {
          const formattedData = this._formatDataForChart(result);

          this.series = [
            {
              name: 'Masculino',
              data: formattedData.map(([date, male]) => [
                date,
                male.toFixed(0),
              ]),
            },
            {
              name: 'Femenino',
              data: formattedData.map(([date, , female]) => [
                date,
                female.toFixed(0),
              ]),
            },
          ];
          this.xaxis.categories = formattedData.map(([date]) => date);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Formatea los datos para el gráfico.
   * @param data datos
   * @returns datos formateados
   */
  private _formatDataForChart(data: any[]): any[] {
    return data.map((item) => {
      const timestamp = new Date(item.date).getTime();
      return [timestamp, item.male, item.female];
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
    this._getAppointmentsPerDayAndGender(this.month, this.year);
  }

  /**
   * Evento que se ejecuta cuando se cambia el año.
   * @param event Evento de cambio.
   */
  public onYearChange(event: any) {
    const selectedYear = event.target.value;
    this.year = selectedYear;
    this._getAppointmentsPerDayAndGender(this.month, this.year);
  }
}
