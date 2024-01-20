import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

// Constantes
import {
  STATUS_NEXT_APPOINTMENT_OPTIONS,
  STATUS_HISTORICAL_APPOINTMENT_OPTIONS,
} from 'src/app/core/constants/options/status-appointment-options.constants';
import { TYPE_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/type-appointment-options.constants';

// Servicios
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de filtros de las citas de un paciente
 */
@Component({
  selector: 'app-filters-appointments-patient-card',
  templateUrl: './filters-appointments-patient-card.component.html',
  providers: [MedicalspecialtyService, DatePipe],
})
export class FiltersAppointmentsPatientCardComponent implements OnInit {
  /** Tipo de página */
  @Input() public typePage: 'next' | 'historical' = 'next';

  /** Formulario para los filtros */
  public filtersForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Estados de la cita */
  public statuses: any = [];

  /** Tipos de cita */
  public types: any = [];

  /** Especialidades médicas */
  public medicalSpecialties: any = [];

  /** Opciones para el campo de fecha */
  public locale = Spanish;

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Emite los filtros */
  @Output() public filters: EventEmitter<any> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _notificationService: NotificationService,
    private _medicalSpecialtyService: MedicalspecialtyService
  ) {
    this.filtersForm = this._fb.group({
      statuses: [[]],
      types: [[]],
      specialties: [[]],
      date: [null],
      requestDate: [null],
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
    this._formatTypes();
    this._getSpecialties();
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
      types: this.form.value.types.map(
        (type: { item_id: string; item_text: string }) => type.item_id
      ),
      specialties: this.form.value.specialties.map(
        (specialty: { item_id: string; item_text: string }) => specialty.item_id
      ),
      date: this.form.value.date,
      requestDate: this.form.value.requestDate,
    };

    if (
      filters.statuses.length === 0 &&
      filters.types.length === 0 &&
      filters.specialties.length === 0 &&
      !filters.date &&
      !filters.requestDate
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
    this.form.get('types')?.setValue([]);
    this.form.get('specialties')?.setValue([]);
    this.form.get('date')?.setValue(null);
    this.form.get('requestDate')?.setValue(null);
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
        ? STATUS_NEXT_APPOINTMENT_OPTIONS
        : STATUS_HISTORICAL_APPOINTMENT_OPTIONS;

    this.statuses = options.map((status: { value: string; text: string }) => {
      return {
        item_id: status.value,
        item_text: status.text,
      };
    });
  }

  /**
   * Formatea y actualiza la lista de tipos de citas.
   * @private
   * @returns {void}
   */
  private _formatTypes(): void {
    this.types = TYPE_APPOINTMENT_OPTIONS.map(
      (type: { value: string; text: string }) => {
        return {
          item_id: type.value,
          item_text: type.text,
        };
      }
    );
  }

  /**
   * Obtiene y actualiza la lista de especialidades médicas.
   * @private
   * @returns {void}
   */
  private _getSpecialties(): void {
    this._medicalSpecialtyService.getItems().subscribe({
      next: (response: any) => {
        this.medicalSpecialties = response.map((specialty: any) => ({
          item_id: specialty.id,
          item_text: specialty.name,
        }));
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(
          'No se han podido obtener las especialidades médicas.'
        );
      },
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
    if (filters.date) {
      filters.date.from = filters.date.from
        ? this._formatDate(filters.date.from)
        : null;
      filters.date.to = filters.date.to
        ? this._formatDate(filters.date.to)
        : null;
    }

    if (filters.requestDate) {
      filters.requestDate.from = filters.requestDate.from
        ? this._formatDate(filters.requestDate.from)
        : null;
      filters.requestDate.to = filters.requestDate.to
        ? this._formatDate(filters.requestDate.to)
        : null;
    }

    return filters;
  }
}
