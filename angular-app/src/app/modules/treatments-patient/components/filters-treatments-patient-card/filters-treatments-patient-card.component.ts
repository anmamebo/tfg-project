import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  STATUS_HISTORICAL_TREATMENT_OPTIONS,
  STATUS_NEXT_TREATMENT_OPTIONS,
} from 'src/app/core/constants/options/status-treatment-options.constants';

interface FilterDate {
  from: string | null;
  to: string | null;
}

interface Filters {
  statuses: string[];
  startDate: FilterDate;
  endDate: FilterDate;
}

interface OptionItem {
  item_id: string;
  item_text: string;
}

/**
 * Componente que representa la tarjeta de filtros de los tratamientos de un paciente
 */
@Component({
  selector: 'app-filters-treatments-patient-card',
  templateUrl: './filters-treatments-patient-card.component.html',
  providers: [DatePipe],
})
export class FiltersTreatmentsPatientCardComponent implements OnInit {
  /** Tipo de página */
  @Input() public typePage: 'next' | 'historical' = 'next';

  /** Formulario para los filtros */
  public filtersForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Estados del tratamiento */
  public statuses: OptionItem[] = [];

  /** Opciones para el campo de fecha */
  public locale = Spanish;

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Emite los filtros */
  @Output() public filters: EventEmitter<Filters | null> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _datePipe: DatePipe) {
    this.filtersForm = this._fb.group({
      statuses: [null],
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'No hay datos disponibles',
      noFilteredDataAvailablePlaceholderText: 'No hay datos disponibles',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Deseleccionar todo',
      allowSearchFilter: true,
    };

    this._formatStatuses();
  }

  get form() {
    return this.filtersForm;
  }

  /**
   * Maneja el envío del formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const filters: Filters = {
      statuses: this.form.value.statuses
        ? this.form.value.statuses.map((status: OptionItem) => status.item_id)
        : null,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
    };

    if (
      (!filters.statuses || filters.statuses.length == 0) &&
      !filters.startDate &&
      !filters.endDate
    ) {
      this.filters.emit(null);
    } else {
      filters.startDate = this._formatDateFilter(filters.startDate);
      filters.endDate = this._formatDateFilter(filters.endDate);
      this.filters.emit(filters);
    }

    this.submitted = false;
  }

  /**
   * Resetea el formulario.
   * @returns {void}
   * @public
   */
  public onReset(): void {
    this.submitted = false;
    this.form.get('statuses')?.setValue(null);
    this.form.get('startDate')?.setValue(null);
    this.form.get('endDate')?.setValue(null);
    this.filters.emit(null);
  }

  /**
   * Formatea y actualiza la lista de estados de las citas.
   * @private
   * @returns {void}
   */
  private _formatStatuses(): void {
    const options =
      this.typePage === 'next'
        ? STATUS_NEXT_TREATMENT_OPTIONS
        : STATUS_HISTORICAL_TREATMENT_OPTIONS;

    this.statuses = options.map((status: { value: string; text: string }) => {
      return {
        item_id: status.value,
        item_text: status.text,
      };
    });
  }

  /**
   * Formatea una fecha.
   * @param {string} rawDate - Fecha a formatear.
   * @returns {string} Fecha formateada.
   * @private
   */
  private _formatDate(rawDate: string): string {
    const date = new Date(rawDate);
    return this._datePipe.transform(date, 'yyyy-MM-dd') || rawDate;
  }

  /**
   * Formatea los filtros de fecha.
   * @param {FilterDate} date - Filtros de fecha.
   * @returns {FilterDate} Filtros formateados.
   * @private
   */
  private _formatDateFilter(date: FilterDate): FilterDate {
    if (date) {
      date.from = date.from ? this._formatDate(date.from) : null;
      date.to = date.to ? this._formatDate(date.to) : null;

      if (!date.to) {
        date.to = date.from;
      }
    }

    return date;
  }
}
