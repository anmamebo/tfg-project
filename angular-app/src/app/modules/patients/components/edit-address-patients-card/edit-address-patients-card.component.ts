import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INTEGER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { AddressService } from "src/app/core/services/address.service";
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Address } from "src/app/core/models/address.model";


/**
 * Componente que representa la tarjeta de edición de la 
 * dirección de un paciente
 */
@Component({
  selector: 'app-edit-address-patients-card',
  templateUrl: './edit-address-patients-card.component.html',
  styleUrls: ['./edit-address-patients-card.component.scss'],
  providers: [AddressService],
})
export class EditAddressPatientsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Dirección';

  /** Dirección que se editará */
  @Input() public address: Address | undefined = undefined;

  /** Identificador del paciente */
  @Input() public patientId: string = '';

  /** Formulario para editar la dirección de un paciente */
  public editAddressPatientForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editAddressPatientForm = this.formBuilder.group({
      street: [this.address?.street, [Validators.required, Validators.maxLength(255)]],
      number: [this.address?.number, [Validators.required, Validators.pattern(INTEGER_REGEXP)]],
      floor: [this.address?.floor, Validators.maxLength(10)],
      city: [this.address?.city, [Validators.required, Validators.maxLength(255)]],
      province: [this.address?.province, [Validators.required, Validators.maxLength(255)]],
      country: [this.address?.country, [Validators.required, Validators.maxLength(255)]],
      postal_code: [this.address?.postal_code, [Validators.required, Validators.pattern(INTEGER_REGEXP), Validators.maxLength(10)]],
    });
  }

  /** Obtiene el formulario */
  get form () { return this.editAddressPatientForm; }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let address: any = {
      id: this.address?.id ? this.address?.id : '',
      street: this.form.value.street,
      number: this.form.value.number,
      floor: this.form.value.floor ? this.form.value.floor : null,
      city: this.form.value.city,
      province: this.form.value.province,
      country: this.form.value.country,
      postal_code: this.form.value.postal_code,
    };

    
    if (this.address === null) { // Si el paciente no tiene dirección, se crea una nueva
      address.patient_id = this.patientId;

      this.addressService.createAddress(address).subscribe({
        next: (data) => {
          this.submitted = false;
          this.notificationService.showSuccessToast(data.message);
        },
        error: (error) => {
          this.notificationService.showErrorToast(error.message);
        }
      });
      
    } else { // Si el paciente tiene dirección, se actualiza
      this.addressService.updateAddress(address).subscribe({
        next: (data) => {
          this.submitted = false;
          this.notificationService.showSuccessToast(data.message);
        },
        error: (error) => {
          this.notificationService.showErrorToast(error.message);
        }
      });
    }
  }
}
