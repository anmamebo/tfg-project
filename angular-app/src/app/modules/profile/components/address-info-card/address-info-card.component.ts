import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INTEGER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { AddressService } from "src/app/core/services/address.service";
import { NotificationService } from "src/app/core/services/notification.service";

// Modelos
import { Address } from "src/app/core/models/address.model";


/**
 * Componente que representa una tarjeta de información de dirección de usuario.
 */
@Component({
  selector: 'app-address-info-card',
  templateUrl: './address-info-card.component.html',
  styleUrls: ['./address-info-card.component.scss'],
  providers: [AddressService, NotificationService],
})
export class AddressInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Dirección';

  /** Dirección que se mostrará */
  @Input() public address: Address = new Address('', '', '', '', '', '', '');

  /** Formulario para actualizar los datos de la dirección */
  public updateAddressDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.updateAddressDataForm = this.formBuilder.group({
      street: [this.address.street, [Validators.required, Validators.maxLength(255)]],
      number: [this.address.number, [Validators.required, Validators.pattern(INTEGER_REGEXP)]],
      floor: [this.address.floor, Validators.maxLength(10)],
      city: [this.address.city, [Validators.required, Validators.maxLength(255)]],
      province: [this.address.province, [Validators.required, Validators.maxLength(255)]],
      country: [this.address.country, [Validators.required, Validators.maxLength(255)]],
      postal_code: [this.address.postal_code, [Validators.required, Validators.pattern(INTEGER_REGEXP), Validators.maxLength(10)]],
    });
  }

  /** Obtiene el formulario */
  get form () { return this.updateAddressDataForm; }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updateAddress: Address = new Address(
      this.address.id,
      this.form.value.street,
      this.form.value.number,
      this.form.value.city,
      this.form.value.province,
      this.form.value.country,
      this.form.value.postal_code,
      this.form.value.floor != '' ? this.form.value.floor : null,
    );

    this.addressService.updateAddress(updateAddress).subscribe({
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
