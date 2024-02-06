import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { PROFILE_PICTURE_ALLOWED_FILE_EXTENSIONS } from 'src/app/core/constants/file-extensions.constants';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { User } from 'src/app/core/models/user.interface';
import { ProfileImageService } from 'src/app/core/services/entities/profile-image.service';
import { UserService } from 'src/app/core/services/entities/user.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import Validation from 'src/app/core/validators/general.validator';

/**
 * Componente que representa una tarjeta de avatar de usuario.
 */
@Component({
  selector: 'app-avatar-card',
  templateUrl: './avatar-card.component.html',
  providers: [UserService],
})
export class AvatarCardComponent {
  /** Propiedad de entrada que recibe un objeto `User` para mostrar su avatar y detalles. */
  @Input() user: User | null = null;

  /** Formulario para la información del avatar */
  public avatarForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Referencia al componente de SweetAlert2 para cambiar el avatar */
  @ViewChild('changeAvatar') changeAvatar!: SwalComponent;

  /** Texto que indica las extensiones de archivo válidas para el avatar */
  public validExtensionsText: string =
    PROFILE_PICTURE_ALLOWED_FILE_EXTENSIONS.join(', ');

  constructor(
    private _fb: FormBuilder,
    public readonly swalTargets: SwalPortalTargets,
    private _userService: UserService,
    private _profileImageService: ProfileImageService,
    private _notificationService: NotificationService
  ) {
    this.avatarForm = this._fb.group({
      file: [
        null,
        [
          Validators.required,
          Validation.fileExtension(PROFILE_PICTURE_ALLOWED_FILE_EXTENSIONS),
        ],
      ],
      fileSource: ['', [Validators.required]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.avatarForm;
  }

  /**
   * Cierra el componente de cambio de avatar.
   * Restablece el estado de envío de datos a falso y cierra el componente modal de cambio de avatar.
   * @returns {void}
   * @public
   */
  public closeChangeAvatar(): void {
    this.submitted = false;
    this.changeAvatar.close();
  }

  /**
   * Maneja el cambio de archivo de entrada para el componente de selección de avatar.
   * Actualiza el valor del archivo seleccionado en el formulario del avatar.
   * @param {any} event - Evento de cambio de archivo del componente de selección de archivos.
   * @returns {void}
   * @public
   */
  public onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatarForm.patchValue({
        fileSource: file,
      });
    }
  }

  /**
   * Gestiona el envío del formulario para actualizar la imagen de perfil del usuario.
   * Actualiza la imagen de perfil del usuario mediante el archivo seleccionado en el formulario.
   * Muestra una notificación de éxito o error según el resultado de la actualización.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.user) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const file = this.form.get('fileSource')?.value as File;

    if (file) {
      this._userService.updateProfilePicture(file).subscribe({
        next: (response: any) => {
          this.submitted = false;
          this._profileImageService.emitProfileImageUpdated(
            response.profile_picture_url
          );
          this._notificationService.showSuccessToast(response.message);
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
    }
  }

  /**
   * Elimina la imagen de perfil del usuario.
   * Realiza una solicitud para eliminar la imagen de perfil del usuario actual.
   * Actualiza la imagen de perfil emitida por el servicio de imágenes de perfil.
   * Muestra una notificación de éxito o error según el resultado de la eliminación.
   * @returns {void}
   * @public
   */
  public onDeleteProfilePicture(): void {
    this._userService.deleteProfilePicture().subscribe({
      next: (response: MessageResponse) => {
        this._profileImageService.emitProfileImageUpdated('');
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
