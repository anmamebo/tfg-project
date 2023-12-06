import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { User } from 'src/app/core/models/user.model';

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
  @Input() public user: User = new User('', '', '', '');

  /** Formulario para actualizar los datos del usuario */
  public updateUserDataForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se actualizan los datos del usuario */
  @Output() public updatedUserEvent: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con las validaciones
    this.updateUserDataForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.updateUserDataForm;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updateUser: User = new User(
      this.user.id,
      this.form.value.username,
      '',
      this.form.value.email,
      this.form.value.name,
      this.form.value.last_name
    );

    // Envía la solicitud de actualización de usuario al servicio
    this.userService.updateUser(updateUser).subscribe({
      next: (data) => {
        this.submitted = false;
        this.updatedUserEvent.emit();
        // Muestra un toast de éxito
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        // Muestra un toast de error
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
