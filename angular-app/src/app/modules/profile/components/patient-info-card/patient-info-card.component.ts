import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

// Constantes
import { GENDER_OPTIONS } from 'src/app/core/constants/options/genders-options.constants';
import { DNI_REGEXP, PHONENUMBER_REGEXP } from 'src/app/core/constants/reg-exp';

// Servicios
import { PatientService } from 'src/app/core/services/patient.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CountriesService } from 'src/app/core/services/countries.service';

// Modelos
import { Patient } from 'src/app/core/models/patient.model';

/**
 * Componente que representa una tarjeta de información de paciente.
 */
@Component({
  selector: 'app-patient-info-card',
  templateUrl: './patient-info-card.component.html',
  providers: [DatePipe, PatientService, CountriesService],
})
export class PatientInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Paciente';

  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Paciente que se mostrará */
  @Input() public patient: Patient | null = null;

  /** Países */
  public nationalities: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Formulario para actualizar los datos del paciente */
  public updatePatientDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se actualizan los datos del paciente */
  @Output() public updatedPatientEvent: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _patientService: PatientService,
    private _countriesService: CountriesService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updatePatientDataForm = this._fb.group({
      dni: [
        this.patient?.dni,
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern(DNI_REGEXP),
        ],
      ],
      social_security: [
        this.patient?.social_security,
        Validators.maxLength(12),
      ],
      gender: [this.patient?.gender, Validators.required],
      birthdate: [this.patient?.birthdate],
      phone: [this.patient?.phone, [Validators.pattern(PHONENUMBER_REGEXP)]],
      nationality: [
        this.patient?.nationality
          ? [
              {
                item_id: this.patient?.nationality,
                item_text: this.patient?.nationality,
              },
            ]
          : [],
      ],
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'No hay datos disponibles',
      noFilteredDataAvailablePlaceholderText: 'No hay datos disponibles',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    };

    this._getCountries();
  }

  /** Obtiene el formulario */
  get form() {
    return this.updatePatientDataForm;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.patient || !this.patient.id) {
      this._notificationService.showErrorToast(
        'No se puede actualizar la información del paciente'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatePatient: any = {
      id: this.patient.id,
      din: this.form.value.dni,
      birthdate: this.form.value.birthdate
        ? this._datePipe.transform(
            new Date(this.form.value.birthdate),
            'yyyy-MM-dd'
          )
        : null,
      gender: this.form.value.gender,
      phone: this.form.value.phone || null,
      social_security: this.form.value.social_security || null,
      nationality: this.form.value.nationality[0]?.item_text || null,
    };

    this._patientService.update(this.patient.id, updatePatient).subscribe({
      next: (data) => {
        this.submitted = false;
        this.updatedPatientEvent.emit();
        this._notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Obtiene los países.
   */
  private _getCountries(): void {
    this._countriesService.getCountries().subscribe({
      next: (data: any) => {
        this.nationalities = data.map((item: any) => ({
          item_id: item.translations.spa.common,
          item_text: item.translations.spa.common,
        }));

        this.nationalities.sort((a: any, b: any) => {
          const itemA = a.item_text.toUpperCase();
          const itemB = b.item_text.toUpperCase();

          if (itemA < itemB) {
            return -1;
          }
          if (itemA > itemB) {
            return 1;
          }
          return 0;
        });
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
