import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

interface FilterDate {
  from: string | null;
  to: string | null;
}

interface Filters {
  completed: 'true' | 'false';
  date: FilterDate;
}

interface OptionItem {
  item_id: string;
  item_text: string;
}

/**
 * Componente que representa la tarjeta de filtros de las pruebas médicos.
 */
@Component({
  selector: 'app-filters-medical-tests-card',
  templateUrl: './filters-medical-tests-card.component.html',
  providers: [DatePipe],
})
export class FiltersMedicalTestsCardComponent implements OnInit {
  /** Formulario para los filtros */
  public filtersForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Estados de la prueba médica */
  public completedOptions: OptionItem[] = [
    { item_id: 'true', item_text: 'Completadas' },
    { item_id: 'false', item_text: 'No completadas' },
  ];

  /** Opciones para el campo de fecha */
  public locale = Spanish;

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Evento que se emite al aplicar los filtros */
  @Output() public filters: EventEmitter<Filters | null> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _datePipe: DatePipe) {
    this.filtersForm = this._fb.group({
      completed: [null],
      date: [null],
    });
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
    };
  }

  get form() {
    return this.filtersForm;
  }

  /**
   * Maneja el envio del formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const filters: Filters = {
      completed: this.form.value.completed
        ? this.form.value.completed[0]?.item_id
        : null,
      date: this.form.value.date,
    };

    if (!filters.completed && !filters.date) {
      this.filters.emit(null);
    } else {
      filters.date = this._formatDateFilter(filters.date);
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
    this.form.get('completed')?.setValue(null);
    this.form.get('date')?.setValue(null);
    this.filters.emit(null);
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
