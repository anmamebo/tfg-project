import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { User } from '@app/core/models/user.interface';
import { UserService } from '@app/core/services/entities/user.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de información básica del usuario
 */
@Component({
  selector: 'app-basic-info-card',
  templateUrl: './basic-info-card.component.html',
  providers: [UserService, NotificationService],
})
export class BasicInfoCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Usuario que se mostrará */
  @Input() public user: User | null = null;

  /** Formulario para actualizar los datos del usuario */
  public updateUserDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se actualizan los datos del usuario */
  @Output() public updatedUserEvent: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con las validaciones
    this.updateUserDataForm = this._fb.group({
      name: [this.user?.name, Validators.required],
      last_name: [this.user?.last_name, Validators.required],
      username: [this.user?.username, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.updateUserDataForm;
  }

  /**
   * Gestiona el envío del formulario para actualizar la información del usuario.
   * Realiza una solicitud para actualizar la información del usuario actual con los datos proporcionados en el formulario.
   * Emite un evento indicando que el usuario ha sido actualizado y muestra una notificación de éxito o error según el resultado.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.user || !this.user.id) {
      this._notificationService.showErrorToast(
        'No se puede actualizar la información del usuario'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updateUser: any = {
      id: this.user.id,
      username: this.user.username,
      email: this.form.value.email,
      name: this.form.value.name,
      last_name: this.form.value.last_name,
    };

    this._userService.update(this.user.id, updateUser).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this.updatedUserEvent.emit();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
