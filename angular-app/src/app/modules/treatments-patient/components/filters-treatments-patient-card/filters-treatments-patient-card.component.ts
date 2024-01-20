import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

// Constantes
import {
  STATUS_NEXT_TREATMENT_OPTIONS,
  STATUS_HISTORICAL_TREATMENT_OPTIONS,
} from 'src/app/core/constants/options/status-treatment-options.constants';

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
  public statuses: any = [];

  /** Opciones para el campo de fecha */
  public locale = Spanish;

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Emite los filtros */
  @Output() public filters: EventEmitter<any> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _datePipe: DatePipe) {
    this.filtersForm = this._fb.group({
      statuses: [[]],
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

    let filters: any = {
      statuses: this.form.value.statuses.map(
        (status: { item_id: string; item_text: string }) => status.item_id
      ),
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
    };

    if (
      filters.statuses.length === 0 &&
      !filters.startDate &&
      !filters.endDate
    ) {
      filters = null;
    }

    filters = this._formatDateFilter(filters);

    this.filters.emit(filters);
    this.submitted = false;
  }

  /**
   * Resetea el formulario.
   * @returns {void}
   * @public
   */
  public onReset(): void {
    this.submitted = false;
    this.form.get('statuses')?.setValue([]);
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
   * @param {any} filters - Filtros a formatear.
   * @returns {any} Filtros formateados.
   * @private
   */
  private _formatDateFilter(filters: any): any {
    if (filters.startDate) {
      filters.startDate.from = filters.startDate.from
        ? this._formatDate(filters.startDate.from)
        : null;
      filters.startDate.to = filters.startDate.to
        ? this._formatDate(filters.startDate.to)
        : null;
    }

    if (filters.endDate) {
      filters.endDate.from = filters.endDate.from
        ? this._formatDate(filters.endDate.from)
        : null;
      filters.endDate.to = filters.endDate.to
        ? this._formatDate(filters.endDate.to)
        : null;
    }

    return filters;
  }
}
