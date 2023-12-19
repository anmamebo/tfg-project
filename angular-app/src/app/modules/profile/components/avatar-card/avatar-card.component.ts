import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

// Servicios
import { UserService } from 'src/app/core/services/entities/user.service';
import { ProfileImageService } from 'src/app/core/services/entities/profile-image.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Models
import { User } from 'src/app/core/models/user.model';

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

  constructor(
    private _fb: FormBuilder,
    public readonly swalTargets: SwalPortalTargets,
    private _userService: UserService,
    private _profileImageService: ProfileImageService,
    private _notificationService: NotificationService
  ) {
    this.avatarForm = this._fb.group({
      file: [null, [Validators.required]],
      fileSource: ['', [Validators.required]],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.avatarForm;
  }

  /**
   * Cierra el modal para cambiar el avatar.
   */
  public closeChangeAvatar() {
    this.submitted = false;
    this.changeAvatar.close();
  }

  /**
   * Maneja el evento de cambio de archivo.
   * @param event Evento de cambio de archivo.
   */
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatarForm.patchValue({
        fileSource: file,
      });
    }
  }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit() {
    this.submitted = true;

    if (!this.user) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const file = this.form.get('fileSource')?.value as File;

    if (file) {
      this._userService.updateProfilePicture(this.user.id, file).subscribe({
        next: (response) => {
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
   * Maneja la acción de eliminar la imagen de perfil.
   */
  public onDeleteProfilePicture() {
    this._userService.deleteProfilePicture().subscribe({
      next: (response) => {
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
