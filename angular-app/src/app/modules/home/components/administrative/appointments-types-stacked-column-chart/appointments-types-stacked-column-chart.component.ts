import { Component } from '@angular/core';

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
} from 'ng-apexcharts';

// Constantes
import { TYPE_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/type-appointment-options.constants';

// Servicios
import { StatisticsService } from 'src/app/core/services/statistics/statistics.service';

/**
 * Componente para el gráfico de citas por mes y tipo.
 */
@Component({
  selector: 'app-appointments-types-stacked-column-chart',
  templateUrl: './appointments-types-stacked-column-chart.component.html',
  providers: [StatisticsService],
})
export class AppointmentsTypesStackedColumnChartComponent {
  /** Series del gráfico. */
  public series: ApexAxisChartSeries;

  /** Configuración del gráfico. */
  public chart: ApexChart;

  /** Configuración de las etiquetas de datos. */
  public dataLabels: ApexDataLabels;

  /** Configuración de las opciones de las series. */
  public plotOptions: ApexPlotOptions;

  /** Configuración del gráfico. */
  public responsive: ApexResponsive[];

  /** Configuración del eje Y. */
  public yaxis: ApexYAxis;

  /** Configuración del eje X. */
  public xaxis: ApexXAxis;

  /** Configuración de la leyenda. */
  public legend: ApexLegend;

  /** Configuración del relleno. */
  public fill: ApexFill;

  /** Año. */
  public year: number;

  /** Años. */
  public years: { name: string; value: number }[] = [];

  constructor(private _statisticsService: StatisticsService) {
    const date = new Date();
    this.year = date.getFullYear();

    this.series = [];
    this.chart = {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    };
    this.responsive = [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ];
    this.plotOptions = {
      bar: {
        horizontal: false,
      },
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
      type: 'category',
      categories: [
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
      ],
      title: {
        text: 'Meses',
      },
    };
    this.legend = {
      position: 'right',
      offsetY: 40,
    };
    this.fill = {
      opacity: 1,
    };
    this.dataLabels = {
      enabled: false,
    };

    this._generateYears();

    this._getAppointmentsTypesStats(2023);
  }

  /**
   * Obtiene las estadísticas de citas por mes y tipo.
   * @param year año
   */
  private _getAppointmentsTypesStats(year: number): void {
    this._statisticsService.getAppointmentsPerMonthAndType(year).subscribe({
      next: (response) => {
        this.series = this._formatDataForChart(response);
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
    let transformedData: any[] = [];

    // Mapear cada tipo y acumular los recuentos por mes
    data.forEach((monthData) => {
      monthData.types.forEach((type: any) => {
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
          const newData: any = {
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
  private _orderSeries(series: any[]): any[] {
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
  private _generateYears() {
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
  public onYearChange(event: any) {
    const selectedYear = event.target.value;
    this.year = selectedYear;
    this._getAppointmentsTypesStats(this.year);
  }
}
