import { Component, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexNoData,
} from 'ng-apexcharts';

// Constantes
import { TYPE_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/type-appointment-options.constants';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

interface TypesData {
  name: string;
  count: number;
}

interface AppointmentsPerTypes {
  month: number;
  types: TypesData[];
}

interface SeriesData {
  name: string;
  data: number[];
}

const DEFAULT_CHART_HEIGHT = 350;
const DEFAULT_RESPONSIVE_BREAKPOINT = 480;
const CATEGORIES = [
  `01`,
  `02`,
  `03`,
  `04`,
  `05`,
  `06`,
  `07`,
  `08`,
  `09`,
  `10`,
  `11`,
  `12`,
];

/**
 * Componente para el gráfico de citas por mes y tipo.
 */
@Component({
  selector: 'app-appointments-types-stacked-column-chart',
  templateUrl: './appointments-types-stacked-column-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsTypesStackedColumnChartComponent implements OnInit {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries = [];

  /** Configuración del gráfico. */
  public chart: ApexChart = {
    type: 'bar',
    height: DEFAULT_CHART_HEIGHT,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  };

  /** Configuración de las etiquetas de datos. */
  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  /** Configuración de las opciones de las series. */
  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
    },
  };

  /** Configuración del gráfico. */
  public responsive: ApexResponsive[] = [
    {
      breakpoint: DEFAULT_RESPONSIVE_BREAKPOINT,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ];

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
    type: 'category',
    categories: CATEGORIES,
    title: {
      text: 'Meses',
    },
  };

  /** Configuración de la leyenda. */
  public legend: ApexLegend = {
    position: 'right',
    offsetY: 40,
  };

  /** Configuración del relleno. */
  public fill: ApexFill = {
    opacity: 1,
  };

  /** Mensaje cuando no hay datos. */
  public noData: ApexNoData = { text: 'Cargando...' };

  /** Año. */
  public year: number;

  /** Años. */
  public years: { name: string; value: number }[] = [];

  constructor(private _statisticsService: StatisticsService) {
    const date = new Date();
    this.year = date.getFullYear();
  }

  ngOnInit(): void {
    this._generateYears();

    this._getAppointmentsTypesStats(this.year);
  }

  /**
   * Obtiene las estadísticas de citas por mes y tipo.
   * @param year año
   */
  private _getAppointmentsTypesStats(year: number): void {
    this._statisticsService.getAppointmentsPerMonthAndType(year).subscribe({
      next: (response: AppointmentsPerTypes[]) => {
        this.series = this._formatDataForChart(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Formatea los datos para el gráfico.
   * @param data datos
   * @returns datos formateados
   */
  private _formatDataForChart(data: AppointmentsPerTypes[]): SeriesData[] {
    let transformedData: SeriesData[] = [];

    // Mapear cada tipo y acumular los recuentos por mes
    data.forEach((monthData: AppointmentsPerTypes) => {
      monthData.types.forEach((type: TypesData) => {
        // Buscar el texto correspondiente al valor 'value' en TYPE_APPOINTMENT_OPTIONS
        const foundType = TYPE_APPOINTMENT_OPTIONS.find(
          (option) => option.value === type.name
        );

        const typeName = foundType ? foundType.text : type.name;

        const foundTypeData = transformedData.find(
          (item) => item.name === typeName
        );

        if (foundTypeData) {
          foundTypeData.data[monthData.month - 1] += type.count;
        } else {
          const newData: SeriesData = {
            name: typeName,
            data: Array(12).fill(0),
          };
          newData.data[monthData.month - 1] = type.count;
          transformedData.push(newData);
        }
      });
    });

    transformedData = this._orderSeries(transformedData);

    return transformedData;
  }

  /**
   * Ordena las series.
   * @param series series
   * @returns series ordenadas
   */
  private _orderSeries(series: SeriesData[]): SeriesData[] {
    return series.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Genera las opciones para los años.
   */
  private _generateYears(): void {
    const startYear = 2023;
    const endYear = 2030;
    for (let i = startYear; i <= endYear; i++) {
      this.years.push({ name: i.toString(), value: i });
    }
  }

  /**
   * Evento que se ejecuta cuando se cambia el año.
   * @param event Evento de cambio.
   */
  public onYearChange(event: Event): void {
    const selectedYear = (event.target as HTMLInputElement)?.value;
    if (selectedYear) {
      this.year = parseInt(selectedYear, 10);
      this._getAppointmentsTypesStats(this.year);
    }
  }
}
