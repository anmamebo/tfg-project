import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INTEGER_REGEXP } from 'src/app/core/constants/regex.constants';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

// Servicios
import { AddressService } from 'src/app/core/services/entities/address.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa el formulario de creación de una dirección.
 */
@Component({
  selector: 'app-form-create-address',
  templateUrl: './form-create-address.component.html',
  providers: [AddressService],
})
export class FormCreateAddressComponent {
  /** Id del paciente */
  @Input() public patientId: string = '';

  /** Evento que se emite cuando se ha creado una dirección. */
  @Output() public createdAddress: EventEmitter<void> =
    new EventEmitter<void>();

  /** Formulario para la información de la dirección */
  public createAddressForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _addressService: AddressService,
    private _notificationService: NotificationService
  ) {
    this.createAddressForm = this._fb.group({
      street: ['', [Validators.required, Validators.maxLength(255)]],
      number: ['', [Validators.required, Validators.pattern(INTEGER_REGEXP)]],
      floor: ['', [Validators.maxLength(10)]],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      province: ['', [Validators.required, Validators.maxLength(255)]],
      postal_code: [
        '',
        [
          Validators.required,
          Validators.pattern(INTEGER_REGEXP),
          Validators.maxLength(10),
        ],
      ],
      country: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.createAddressForm;
  }

  /**
   * Gesriona el envío del formulario para crear una dirección.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const addressData: any = {
      patient_id: this.patientId,
      street: this.form.value.street,
      number: this.form.value.number,
      floor: this.form.value.floor || null,
      city: this.form.value.city,
      province: this.form.value.province,
      postal_code: this.form.value.postal_code,
      country: this.form.value.country,
    };

    this._addressService.createAddress(addressData).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this.createdAddress.emit();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
