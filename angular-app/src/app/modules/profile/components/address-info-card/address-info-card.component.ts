import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INTEGER_REGEXP } from 'src/app/core/constants/regex.constants';

// Servicios
import { AddressService } from 'src/app/core/services/entities/address.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Address } from 'src/app/core/models/address.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

/**
 * Componente que representa una tarjeta de información de dirección de usuario.
 */
@Component({
  selector: 'app-address-info-card',
  templateUrl: './address-info-card.component.html',
  providers: [AddressService, NotificationService],
})
export class AddressInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Dirección';

  /** Dirección que se mostrará */
  @Input() public address: Address = {} as Address;

  /** Formulario para actualizar los datos de la dirección */
  public updateAddressDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar los datos del paciente */
  @Output() public refreshPatient: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _addressService: AddressService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateAddressDataForm = this._fb.group({
      street: [
        this.address.street,
        [Validators.required, Validators.maxLength(255)],
      ],
      number: [
        this.address.number,
        [Validators.required, Validators.pattern(INTEGER_REGEXP)],
      ],
      floor: [this.address.floor, Validators.maxLength(10)],
      city: [
        this.address.city,
        [Validators.required, Validators.maxLength(255)],
      ],
      province: [
        this.address.province,
        [Validators.required, Validators.maxLength(255)],
      ],
      country: [
        this.address.country,
        [Validators.required, Validators.maxLength(255)],
      ],
      postal_code: [
        this.address.postal_code,
        [
          Validators.required,
          Validators.pattern(INTEGER_REGEXP),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.updateAddressDataForm;
  }

  /**
   * Gestiona la actualización de la dirección del paciente utilizando los datos ingresados en el formulario.
   * Actualiza la dirección del paciente mediante el servicio de direcciones.
   * Muestra una notificación de éxito o error según el resultado de la actualización.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updateAddress: Address = {
      id: this.address.id,
      street: this.form.value.street,
      number: this.form.value.number,
      city: this.form.value.city,
      province: this.form.value.province,
      country: this.form.value.country,
      postal_code: this.form.value.postal_code,
      floor: this.form.value.floor || null,
    };

    this._addressService.updateAddress(updateAddress).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Elimina la dirección del paciente.
   * @returns {void}
   * @public
   */
  public onDelete(): void {
    if (!this.address) return;

    this._notificationService.showConfirmDeleteDialog(() => {
      if (!this.address) return;

      this._addressService.deleteAddress(this.address.id).subscribe({
        next: (response: MessageResponse) => {
          this._notificationService.showSuccessToast(response.message);
          this.form.reset();
          this.refreshPatient.emit();
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
    });
  }
}
