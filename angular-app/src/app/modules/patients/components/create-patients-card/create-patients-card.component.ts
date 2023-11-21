import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { Subscription } from 'rxjs';

import { Spanish } from "flatpickr/dist/l10n/es.js";
import { GENDER_OPTIONS } from "src/app/core/constants/genders-options";
import { PHONENUMBER_REGEXP } from "src/app/core/constants/reg-exp";
import { INTEGER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { PatientService } from "src/app/core/services/patient.service";
import { NotificationService } from 'src/app/core/services/notification.service';


/**
 * Componente que representa la tarjeta de creación de un paciente
 */
@Component({
  selector: 'app-create-patients-card',
  templateUrl: './create-patients-card.component.html',
  styleUrls: ['./create-patients-card.component.scss'],
  providers: [PatientService, DatePipe],
})
export class CreatePatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Paciente';

  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Formulario para la información del paciente */
  public patientInfoForm: FormGroup;
  
  /** Formulario para la dirección */
  public addressForm: FormGroup;
  
  /** Formulario para la creación de un paciente */
  public createPatientForm: FormGroup;

  /** Indica si se ha enviado el formulario */
  public submitted: Boolean = false;

  /** Suscripción al valor del campo DNI */
  private dniInputSubscription: Subscription = new Subscription();

  /** Indica si se muestran los campos de dirección */
  public showAddressInputs: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private notificationService: NotificationService
  ) {
    this.patientInfoForm = this.formBuilder.group({
      username: [''],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.maxLength(9)]],
      social_security: ['', Validators.maxLength(12)],
      birthdate: [''],
      gender: ['', Validators.required],
      phone: ['', Validators.pattern(PHONENUMBER_REGEXP)],
    });

    this.addressForm = this.formBuilder.group({
      street: [''],
      number: [''],
      floor: [''],
      city: [''],
      province: [''],
      country: [''],
      postal_code: [''],
    });

    this.createPatientForm = this.formBuilder.group({
      patientInfoForm: this.patientInfoForm,
      addressForm: this.addressForm
    });
  }

  ngOnInit(): void {
    this.dniInputSubscription = this.createPatientForm.get('patientInfoForm')!.get('dni')!.valueChanges.subscribe((value: string) => {
      this.createPatientForm.get('patientInfoForm')!.get('username')!.setValue(value);
    });
  }

  /** Obtiene los controles del formulario de información del paciente */
  get patientInfo() { return this.createPatientForm.get('patientInfoForm'); }

  /** Obtiene los controles del formulario de dirección */
  get address() { return this.createPatientForm.get('addressForm'); }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.createPatientForm.invalid) {
      return;
    }

    let patient: any = {
      user: {
        name: this.patientInfo?.value.name,
        last_name: this.patientInfo?.value.last_name,
        email: this.patientInfo?.value.email
      },
      dni: this.patientInfo?.value.dni,
      social_security: this.patientInfo?.value.social_security ? this.patientInfo?.value.social_security : null,
      birthdate: this.patientInfo?.value.birthdate ? this.datePipe.transform(new Date(this.patientInfo?.value.birthdate), 'yyyy-MM-dd') : null,
      phone: this.patientInfo?.value.phone ? this.patientInfo?.value.phone : null,
      gender: this.patientInfo?.value.gender
    }

    if (this.showAddressInputs) {
      patient.address = {
        street: this.address?.value.street,
        number: this.address?.value.number,
        floor: this.address?.value.floor ? this.address?.value.floor : null,
        city: this.address?.value.city,
        province: this.address?.value.province,
        country: this.address?.value.country,
        postal_code: this.address?.value.postal_code,
      }
    }

    this.patientService.createPatient(patient).subscribe({
      next: (data) => {
        this.createPatientForm.reset();
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }

  /**
   * Muestra u oculta los campos de dirección.
   */
  public toggleAddressInputs(): void {
    this.showAddressInputs = !this.showAddressInputs;
    this.initAddressValidators();
  }

  /**
   * Inicializa los validadores de los campos de dirección en función de si se muestran o no.
   */
  private initAddressValidators(): void {
    this.submitted = false;

    const fields = ['street', 'number', 'floor', 'city', 'province', 'country', 'postal_code'];
    const address = this.address;

    if (!this.showAddressInputs && address) {
      fields.forEach((field) => { // Se eliminan los validadores de los campos de dirección
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
        postal_code: [Validators.required, Validators.pattern(INTEGER_REGEXP), Validators.maxLength(10)]
      };
      
      fields.forEach((field) => { // Se añaden los validadores de los campos de dirección
        const control = address.get(field);
        if (control && validators[field as keyof typeof validators]) {
          control.setValidators(validators[field as keyof typeof validators]); // Se añaden los validadores
          control.updateValueAndValidity(); // Se actualiza el valor y la validez
        }
      });
    }
  }
}
