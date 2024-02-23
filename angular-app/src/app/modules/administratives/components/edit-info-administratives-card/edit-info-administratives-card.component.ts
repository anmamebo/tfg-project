import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { User } from 'src/app/core/models/user.interface';
import { AdministrativeService } from 'src/app/core/services/entities/administrative.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de un administrativo
 */
@Component({
  selector: 'app-edit-info-administratives-card',
  templateUrl: './edit-info-administratives-card.component.html',
  providers: [AdministrativeService],
})
export class EditInfoAdministrativesCardComponent implements OnInit {
  /** Administrativo que se editará */
  @Input() public administrative: User | null = null;

  /** Formulario para editar la información básica de un administrativo */
  public editInfoAdministrativeForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar los datos del administrativo */
  @Output() public refreshAdministrative: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _administrativeService: AdministrativeService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editInfoAdministrativeForm = this._fb.group({
      name: [this.administrative?.name, Validators.required],
      last_name: [this.administrative?.last_name, Validators.required],
      email: [
        this.administrative?.email,
        [Validators.required, Validators.email],
      ],
      username: [this.administrative?.username, Validators.required],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.editInfoAdministrativeForm;
  }

  /**
   * Maneja el envío del formulario para actualizar la información de un administrativo existente.
   * Actualiza los datos del administrativo en función de la información ingresada en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.administrative || !this.administrative.id) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener al administrativo'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const administrativeData: any = {
      name: this.form.value.name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      username: this.form.value.username,
    };

    this._administrativeService
      .update(this.administrative.id, administrativeData)
      .subscribe({
        next: (response: MessageResponse) => {
          this.submitted = false;
          this._notificationService.showSuccessToast(response.message);
          this.refreshAdministrative.emit();
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
