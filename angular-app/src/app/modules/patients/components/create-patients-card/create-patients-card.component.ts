import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

// Constantes
import { GENDER_OPTIONS } from 'src/app/core/constants/options/genders-options.constants';
import {
  DNI_REGEXP,
  PHONENUMBER_REGEXP,
  INTEGER_REGEXP,
} from 'src/app/core/constants/reg-exp';

// Servicios
import { PatientService } from 'src/app/core/services/patient.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CountriesService } from 'src/app/core/services/countries.service';

/**
 * Componente que representa la tarjeta de creación de un paciente
 */
@Component({
  selector: 'app-create-patients-card',
  templateUrl: './create-patients-card.component.html',
  providers: [PatientService, CountriesService, DatePipe],
})
export class CreatePatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Paciente';

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

  /** Suscripción al valor del campo DNI */
  private _dniInputSubscription: Subscription = new Subscription();

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
      username: [''],
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

    this._dniInputSubscription = this.createPatientForm
      .get('patientInfoForm')!
      .get('dni')!
      .valueChanges.subscribe((value: string) => {
        this.createPatientForm
          .get('patientInfoForm')!
          .get('username')!
          .setValue(value);
      });
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
   * Maneja la acción de enviar el formulario.
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
      next: (data) => {
        this.createPatientForm.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Muestra u oculta los campos de dirección.
   */
  public toggleAddressInputs(): void {
    this.showAddressInputs = !this.showAddressInputs;
    this._initAddressValidators();
  }

  /**
   * Inicializa los validadores de los campos de dirección en función de si se muestran o no.
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
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
