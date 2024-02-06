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
 * Componente que representa la tarjeta de edición de la
 * dirección de un paciente
 */
@Component({
  selector: 'app-edit-address-patients-card',
  templateUrl: './edit-address-patients-card.component.html',
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

  /** Evento para actualizar los datos del paciente */
  @Output() public refreshPatient: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _addressService: AddressService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editAddressPatientForm = this._fb.group({
      street: [
        this.address?.street,
        [Validators.required, Validators.maxLength(255)],
      ],
      number: [
        this.address?.number,
        [Validators.required, Validators.pattern(INTEGER_REGEXP)],
      ],
      floor: [this.address?.floor, Validators.maxLength(10)],
      city: [
        this.address?.city,
        [Validators.required, Validators.maxLength(255)],
      ],
      province: [
        this.address?.province,
        [Validators.required, Validators.maxLength(255)],
      ],
      country: [
        this.address?.country,
        [Validators.required, Validators.maxLength(255)],
      ],
      postal_code: [
        this.address?.postal_code,
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
    return this.editAddressPatientForm;
  }

  /**
   * Gestiona el envío del formulario de dirección de un paciente.
   * Crea o actualiza la dirección del paciente según corresponda.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let address: any = {
      id: this.address?.id ?? '',
      street: this.form.value.street,
      number: this.form.value.number,
      floor: this.form.value.floor || null,
      city: this.form.value.city,
      province: this.form.value.province,
      country: this.form.value.country,
      postal_code: this.form.value.postal_code,
    };

    if (this.address === null) {
      // Si el paciente no tiene dirección, se crea una nueva
      address.patient_id = this.patientId;

      this._addressService.createAddress(address).subscribe({
        next: (response: MessageResponse) => {
          this.submitted = false;
          this._notificationService.showSuccessToast(response.message);
          this.refreshPatient.emit();
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
    } else {
      // Si el paciente tiene dirección, se actualiza
      this._addressService.updateAddress(address).subscribe({
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
