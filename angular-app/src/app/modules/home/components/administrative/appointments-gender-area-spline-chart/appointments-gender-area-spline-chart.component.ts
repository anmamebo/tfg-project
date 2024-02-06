import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexNoData,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

interface GenderData {
  name: string;
  count: number;
}

interface AppointmentsPerGender {
  date: string;
  genders: GenderData[];
}

interface SeriesData {
  name: string;
  data: [number, string][];
}

const DEFAULT_CHART_HEIGHT = 350;

/**
 * Componente para el gráfico de citas por día y género.
 */
@Component({
  selector: 'app-appointments-gender-area-spline-chart',
  templateUrl: './appointments-gender-area-spline-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsGenderAreaSplineChartComponent implements OnInit {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries = [
    {
      name: 'Masculino',
      data: [],
    },
    {
      name: 'Femenino',
      data: [],
    },
  ];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    height: DEFAULT_CHART_HEIGHT,
    type: 'area',
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
    categories: [],
  };

  /** Configuración del relleno. */
  public stroke: ApexStroke = {
    curve: 'smooth',
  };

  /** Configuración del tooltip. */
  public tooltip: ApexTooltip = {
    x: {
      format: 'dd/MM/yy',
    },
  };

  /** Configuración de las etiquetas de datos. */
  public dataLabels: ApexDataLabels = {
    enabled: false,
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

  constructor(private _statisticsService: StatisticsService) {
    const date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  }

  ngOnInit(): void {
    this._generateMonths();
    this._generateYears();

    this._getAppointmentsPerDayAndGender(this.month, this.year);
  }

  /**
   * Obtiene y asigna estadísticas de citas por día y género para un mes y año dados.
   * @private
   * @param {number} month - Mes para el que se obtienen las estadísticas.
   * @param {number} year - Año para el que se obtienen las estadísticas.
   * @returns {void}
   */
  private _getAppointmentsPerDayAndGender(month: number, year: number): void {
    this._statisticsService
      .getAppointmentsPerDayAndGender(month, year)
      .subscribe({
        next: (response: AppointmentsPerGender[]) => {
          const formattedData = this._formatDataForChart(response);

          this.series = formattedData.series as ApexAxisChartSeries;
          this.xaxis.categories = formattedData.xaxisCategories;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  /**
   * Formatea los datos de citas por género para su visualización en un gráfico.
   * @private
   * @param {AppointmentsPerGender[]} data - Datos de citas por género a formatear.
   * @returns {{ xaxisCategories: number[]; series: SeriesData[]; }} Objeto con datos formateados para el gráfico.
   */
  private _formatDataForChart(data: AppointmentsPerGender[]): {
    xaxisCategories: number[];
    series: SeriesData[];
  } {
    const xaxisCategories: number[] = [];
    const series: SeriesData[] = [
      {
        name: 'Masculino',
        data: [],
      },
      {
        name: 'Femenino',
        data: [],
      },
    ];

    data.forEach((item: AppointmentsPerGender) => {
      const date = new Date(item.date).getTime();
      xaxisCategories.push(date);

      item.genders.forEach((gender: GenderData, index: number) => {
        series[index].data.push([date, gender.count.toString()]);
      });
    });

    return {
      xaxisCategories: xaxisCategories,
      series: series,
    };
  }

  /**
   * Genera y asigna los nombres de los meses junto con sus valores correspondientes.
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
   * Genera y asigna los nombres de los años junto con sus valores correspondientes.
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
   * Maneja el cambio de mes y actualiza las estadísticas de citas por día y género.
   * @public
   * @param {Event} event - Evento que desencadena el cambio de mes.
   * @returns {void}
   */
  public onMonthChange(event: Event): void {
    const selectedMonth = (event.target as HTMLInputElement)?.value;
    if (selectedMonth) {
      this.month = parseInt(selectedMonth, 10);
      this._getAppointmentsPerDayAndGender(this.month, this.year);
    }
  }

  /**
   * Maneja el cambio de año y actualiza las estadísticas de citas por día y género.
   * @public
   * @param {Event} event - Evento que desencadena el cambio de año.
   * @returns {void}
   */
  public onYearChange(event: Event): void {
    const selectedYear = (event.target as HTMLInputElement)?.value;
    if (selectedYear) {
      this.year = parseInt(selectedYear, 10);
      this._getAppointmentsPerDayAndGender(this.month, this.year);
    }
  }
}
