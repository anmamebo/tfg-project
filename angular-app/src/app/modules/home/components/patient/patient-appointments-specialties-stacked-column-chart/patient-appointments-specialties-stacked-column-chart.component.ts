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

// Servicios
import { PatientStatisticsService } from 'src/app/core/services/statistics/patient-statistics.service';

interface SpecialtiesData {
  name: string;
  count: number;
}

interface AppointmentsPerSpecialties {
  month: number;
  specialties: SpecialtiesData[];
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
const COLORS = [
  '#008FFB',
  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0',
  '#D10CE8',
  '#26a69a',
];

@Component({
  selector: 'app-patient-appointments-specialties-stacked-column-chart',
  templateUrl:
    './patient-appointments-specialties-stacked-column-chart.component.html',
  providers: [PatientStatisticsService],
})
export class PatientAppointmentsSpecialtiesStackedColumnChartComponent
  implements OnInit
{
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

  /** Colores. */
  public colors: string[] = COLORS;

  /** Mensaje cuando no hay datos. */
  public noData: ApexNoData = { text: 'Cargando...' };

  /** Año. */
  public year: number;

  /** Años. */
  public years: { name: string; value: number }[] = [];

  constructor(private _patientStatisticsService: PatientStatisticsService) {
    const date = new Date();
    this.year = date.getFullYear();
  }

  ngOnInit(): void {
    this._generateYears();

    this._getAppointmentsSpecialtiesStats(this.year);
  }

  /**
   * Obtiene y actualiza las estadísticas de citas por especialidades para un año específico.
   * @private
   * @param {number} year - Año para el que se obtienen las estadísticas de citas por especialidades.
   * @returns {void}
   */
  private _getAppointmentsSpecialtiesStats(year: number): void {
    this._patientStatisticsService
      .getPatientAppointmentsPerSpecialtyAndMonth(year)
      .subscribe({
        next: (response: AppointmentsPerSpecialties[]) => {
          this.series = this._formatDataForChart(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  /**
   * Formatea los datos de citas por especialidades para su representación en un gráfico.
   * @private
   * @param {AppointmentsPerSpecialties[]} data - Datos de citas por especialidades a formatear.
   * @returns {SeriesData[]} Datos formateados para el gráfico, en un arreglo de objetos de datos de serie.
   */
  private _formatDataForChart(
    data: AppointmentsPerSpecialties[]
  ): SeriesData[] {
    const transformedData: SeriesData[] = [];

    // Mapear cada especialidad y acumular los recuentos por mes
    data.forEach((monthData: AppointmentsPerSpecialties) => {
      monthData.specialties.forEach((specialty: SpecialtiesData) => {
        // Buscar si la especialidad ya existe en los datos transformados
        const foundSpecialty = transformedData.find(
          (item) => item.name === specialty.name
        );

        if (foundSpecialty) {
          // Si la especialidad ya está en los datos transformados, actualizar el recuento en el mes correspondiente
          foundSpecialty.data[monthData.month - 1] += specialty.count;
        } else {
          // Si la especialidad no está en los datos transformados, crear un nuevo objeto y agregarlo
          const newData: SeriesData = {
            name: specialty.name,
            data: Array(12).fill(0), // Crear un array de 12 elementos con valores predeterminados en 0
          };
          newData.data[monthData.month - 1] = specialty.count; // Asignar el recuento en el mes correspondiente
          transformedData.push(newData);
        }
      });
    });

    return transformedData;
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
   * Maneja el cambio de año y actualiza las estadísticas de citas por especialidades.
   * @public
   * @param {Event} event - El evento que desencadena el cambio de año.
   * @returns {void}
   */
  public onYearChange(event: Event): void {
    const selectedYear = (event.target as HTMLInputElement)?.value;
    if (selectedYear) {
      this.year = parseInt(selectedYear, 10);
      this._getAppointmentsSpecialtiesStats(this.year);
    }
  }
}
