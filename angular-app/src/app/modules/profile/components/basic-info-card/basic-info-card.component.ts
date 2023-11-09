import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  styleUrls: ['./basic-info-card.component.scss'],
  providers: [UserService, NotificationService],
})
export class BasicInfoCardComponent implements OnInit {
  /**
   * Usuario que se mostrará
   */
  @Input() user: User = new User('', '', '', '');

  /**
   * Usuario que se actualizará
   */
  public updateUser: User = new User('', '', '', '');

  /**
   * Formulario para actualizar los datos del usuario
   */
  public updateUserDataForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });

  /**
   * Indica si se ha enviado el formulario
   */
  public submitted: Boolean = false;

  /**
   * Evento que se emite cuando se actualizan los datos del usuario
   */
  @Output() public updatedUserEvent: EventEmitter<void> = new EventEmitter<void>();

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

  /**
   * Obtiene los controles del formulario
   * @returns Los controles del formulario
   */
  get form() {
    return this.updateUserDataForm.controls;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit() {
    this.submitted = true;

    if (this.updateUserDataForm.invalid) {
      return;
    }

    // Actualiza los datos del usuario a partir del formulario
    this.updateUser.id = this.user.id;
    this.updateUser.name = this.updateUserDataForm['value'].name;
    this.updateUser.last_name = this.updateUserDataForm['value'].last_name;
    this.updateUser.username = this.updateUserDataForm['value'].username;
    this.updateUser.email = this.updateUserDataForm['value'].email;

    // Envía la solicitud de actualización de usuario al servicio
    this.userService.updateUser(this.updateUser).subscribe({
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
