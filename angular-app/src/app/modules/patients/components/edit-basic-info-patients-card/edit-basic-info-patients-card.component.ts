import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GENDER_OPTIONS } from '@app/core/constants/options/genders-options.constants';
import { DNI_REGEXP } from '@app/core/constants/regex.constants';
import { Patient } from '@app/core/models/patient.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { CountriesService } from '@app/core/services/entities/countries.service';
import { PatientService } from '@app/core/services/entities/patient.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de un paciente
 */
@Component({
  selector: 'app-edit-basic-info-patients-card',
  templateUrl: './edit-basic-info-patients-card.component.html',
  providers: [DatePipe, PatientService, CountriesService],
})
export class EditBasicInfoPatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Paciente que se editará */
  @Input() public patient: Patient | null = null;

  /** Países */
  public nationalities: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  /** Formulario para editar la información básica de un paciente */
  public editBasicInfoPatientForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar los datos del paciente */
  @Output() public refreshPatient: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _patientService: PatientService,
    private _countriesService: CountriesService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editBasicInfoPatientForm = this._fb.group({
      name: [this.patient?.user?.name, Validators.required],
      last_name: [this.patient?.user?.last_name, Validators.required],
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
      birthdate: [this.patient?.birthdate],
      gender: [this.patient?.gender, Validators.required],
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
    return this.editBasicInfoPatientForm;
  }

  /**
   * Gestiona el envío del formulario de actualización de información del paciente.
   * Actualiza la información del paciente utilizando los datos ingresados en el formulario.
   * Emite un evento para actualizar la lista de pacientes después de la actualización exitosa.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (
      !this.patient ||
      !this.patient.id ||
      !this.patient.user ||
      !this.patient.user.id
    ) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener el paciente.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.patient.id,
      dni: this.form.value.dni,
      social_security: this.form.value.social_security || null,
      birthdate: this.form.value.birthdate
        ? this._datePipe.transform(
            new Date(this.form.value.birthdate),
            'yyyy-MM-dd'
          )
        : null,
      gender: this.form.value.gender,
      nationality: this.form.value.nationality[0]?.item_text || null,
      user: {
        id: this.patient.user.id,
        name: this.form.value.name,
        last_name: this.form.value.last_name,
      },
    };

    this._patientService.update(this.patient.id, updatedData).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
        this.refreshPatient.emit();
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
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
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
