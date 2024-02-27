import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  STATUS_HISTORICAL_APPOINTMENT_OPTIONS,
  STATUS_NEXT_APPOINTMENT_OPTIONS,
} from '@app/core/constants/options/status-appointment-options.constants';
import { TYPE_APPOINTMENT_OPTIONS } from '@app/core/constants/options/type-appointment-options.constants';
import { MedicalSpecialty } from '@app/core/models/medical-specialty.interface';
import { ListResponse } from '@app/core/models/response/list-response.interface';
import { MedicalspecialtyService } from '@app/core/services/entities/medicalspecialty.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

interface FilterDate {
  from: string | null;
  to: string | null;
}

interface Filters {
  statuses: string[];
  types: string[];
  specialties: string[];
  date: FilterDate;
  requestDate: FilterDate;
}

interface OptionItem {
  item_id: string;
  item_text: string;
}

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
  public statuses: OptionItem[] = [];

  /** Tipos de cita */
  public types: OptionItem[] = [];

  /** Especialidades médicas */
  public medicalSpecialties: OptionItem[] = [];

  /** Opciones para el campo de fecha */
  public locale = Spanish;

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Emite los filtros */
  @Output() public filters: EventEmitter<Filters | null> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _notificationService: NotificationService,
    private _medicalSpecialtyService: MedicalspecialtyService
  ) {
    this.filtersForm = this._fb.group({
      statuses: [null],
      types: [null],
      specialties: [null],
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

    const filters: Filters = {
      statuses: this.form.value.statuses
        ? this.form.value.statuses.map((status: OptionItem) => status.item_id)
        : null,
      types: this.form.value.types
        ? this.form.value.types.map((type: OptionItem) => type.item_id)
        : null,
      specialties: this.form.value.specialties
        ? this.form.value.specialties.map(
            (specialty: OptionItem) => specialty.item_id
          )
        : null,
      date: this.form.value.date,
      requestDate: this.form.value.requestDate,
    };

    if (
      (!filters.statuses || filters.statuses.length == 0) &&
      (!filters.types || filters.types.length == 0) &&
      (!filters.specialties || filters.specialties.length == 0) &&
      !filters.date &&
      !filters.requestDate
    ) {
      this.filters.emit(null);
    } else {
      filters.date = this._formatDateFilter(filters.date);
      filters.requestDate = this._formatDateFilter(filters.requestDate);
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
    this.form.get('types')?.setValue(null);
    this.form.get('specialties')?.setValue(null);
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
      next: (response: ListResponse<MedicalSpecialty>) => {
        if (Array.isArray(response)) {
          this.medicalSpecialties = response.map(
            (specialty: MedicalSpecialty) => ({
              item_id: specialty.id,
              item_text: specialty.name,
            })
          );
        }
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
