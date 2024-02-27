import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GENDER_OPTIONS } from '@app/core/constants/options/genders-options.constants';
import {
  DNI_REGEXP,
  INTEGER_REGEXP,
  PHONENUMBER_REGEXP,
} from '@app/core/constants/regex.constants';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { CountriesService } from '@app/core/services/entities/countries.service';
import { PatientService } from '@app/core/services/entities/patient.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

/**
 * Componente que representa la tarjeta de creación de un paciente
 */
@Component({
  selector: 'app-create-patients-card',
  templateUrl: './create-patients-card.component.html',
  providers: [PatientService, CountriesService, DatePipe],
})
export class CreatePatientsCardComponent implements OnInit {
  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Formulario para la información del paciente */
  public patientInfoForm: FormGroup = new FormGroup({});

  /** Formulario para la dirección */
  public addressForm: FormGroup = new FormGroup({});

  /** Formulario para la creación de un paciente */
  public createPatientForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Indica si se muestran los campos de dirección */
  public showAddressInputs: boolean = false;

  /** Países */
  public nationalities: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _patientService: PatientService,
    private _countriesService: CountriesService,
    private _notificationService: NotificationService
  ) {
    this.patientInfoForm = this._fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: [
        '',
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern(DNI_REGEXP),
        ],
        ,
      ],
      social_security: ['', Validators.maxLength(12)],
      birthdate: [''],
      gender: ['', Validators.required],
      phone: ['', Validators.pattern(PHONENUMBER_REGEXP)],
      nationality: [''],
    });

    this.addressForm = this._fb.group({
      street: [''],
      number: [''],
      floor: [''],
      city: [''],
      province: [''],
      country: [''],
      postal_code: [''],
    });

    this.createPatientForm = this._fb.group({
      patientInfoForm: this.patientInfoForm,
      addressForm: this.addressForm,
    });
  }

  ngOnInit(): void {
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

  /** Obtiene los controles del formulario de información del paciente */
  get patientInfo() {
    return this.createPatientForm.get('patientInfoForm');
  }

  /** Obtiene los controles del formulario de dirección */
  get address() {
    return this.createPatientForm.get('addressForm');
  }

  /**
   * Maneja el envío del formulario para la creación de un nuevo paciente.
   * Crea un nuevo paciente utilizando la información ingresada en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.createPatientForm.invalid || !this.patientInfo) {
      return;
    }

    let patient: any = {
      user: {
        name: this.patientInfo.value.name,
        last_name: this.patientInfo.value.last_name,
        email: this.patientInfo.value.email,
      },
      dni: this.patientInfo.value.dni,
      social_security: this.patientInfo.value.social_security || null,
      birthdate: this.patientInfo.value.birthdate
        ? this._datePipe.transform(
            new Date(this.patientInfo.value.birthdate),
            'yyyy-MM-dd'
          )
        : null,
      phone: this.patientInfo.value.phone || null,
      gender: this.patientInfo.value.gender,
      nationality: this.patientInfo.value.nationality[0]?.item_text || null,
    };

    if (this.showAddressInputs && this.address) {
      patient.address = {
        street: this.address.value.street,
        number: this.address.value.number,
        floor: this.address.value.floor || null,
        city: this.address.value.city,
        province: this.address.value.province,
        country: this.address.value.country,
        postal_code: this.address.value.postal_code,
      };
    }

    this._patientService.create(patient).subscribe({
      next: (response: MessageResponse) => {
        this.createPatientForm.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Alterna la visualización de los campos de dirección.
   * Cambia el estado de visualización de los campos de dirección entre visible e invisible.
   * Inicializa los validadores de dirección en función del estado actual.
   * @returns {void}
   * @public
   */
  public toggleAddressInputs(): void {
    this.showAddressInputs = !this.showAddressInputs;
    this._initAddressValidators();
  }

  /**
   * Inicializa los validadores para los campos de dirección, dependiendo del estado de visualización de dichos campos.
   * Si los campos de dirección están visibles, se aplican validadores específicos a cada campo.
   * Si los campos de dirección están ocultos, se eliminan los validadores de los campos correspondientes.
   * @returns {void}
   * @private
   */
  private _initAddressValidators(): void {
    this.submitted = false;

    const fields = [
      'street',
      'number',
      'floor',
      'city',
      'province',
      'country',
      'postal_code',
    ];
    const address = this.address;

    if (!this.showAddressInputs && address) {
      fields.forEach((field) => {
        // Se eliminan los validadores de los campos de dirección
        const control = address.get(field);
        if (control) {
          control.clearValidators(); // Se eliminan los validadores
          control.updateValueAndValidity(); // Se actualiza el valor y la validez
        }
      });
    } else if (address) {
      const validators = {
        street: [Validators.required, Validators.maxLength(255)],
        number: [Validators.required, Validators.pattern(INTEGER_REGEXP)],
        floor: [Validators.maxLength(10)],
        city: [Validators.required, Validators.maxLength(255)],
        province: [Validators.required, Validators.maxLength(255)],
        country: [Validators.required, Validators.maxLength(255)],
        postal_code: [
          Validators.required,
          Validators.pattern(INTEGER_REGEXP),
          Validators.maxLength(10),
        ],
      };

      fields.forEach((field) => {
        // Se añaden los validadores de los campos de dirección
        const control = address.get(field);
        if (control && validators[field as keyof typeof validators]) {
          control.setValidators(validators[field as keyof typeof validators]); // Se añaden los validadores
          control.updateValueAndValidity(); // Se actualiza el valor y la validez
        }
      });
    }
  }

  /**
   * Obtiene la lista de países y prepara los datos para su uso como nacionalidades.
   * Actualiza la lista de nacionalidades con los países obtenidos del servicio.
   * @returns {void}
   * @private
   */
  private _getCountries(): void {
    this._countriesService.getCountries().subscribe({
      next: (response: any) => {
        this.nationalities = response.map((item: any) => ({
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
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
