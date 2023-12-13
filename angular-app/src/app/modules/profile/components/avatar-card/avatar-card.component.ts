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
import { UserService } from 'src/app/core/services/user.service';
import { ProfileImageService } from 'src/app/core/services/profile-image.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    private formBuilder: FormBuilder,
    public readonly swalTargets: SwalPortalTargets,
    private userService: UserService,
    private profileImageService: ProfileImageService,
    private notificationService: NotificationService
  ) {
    this.avatarForm = this.formBuilder.group({
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
      this.userService.updateProfilePicture(this.user.id, file).subscribe({
        next: (response) => {
          this.submitted = false;
          this.profileImageService.emitProfileImageUpdated(
            response.profile_picture_url
          );
          this.notificationService.showSuccessToast(response.message);
        },
        error: (error) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
    }
  }

  /**
   * Maneja la acción de eliminar la imagen de perfil.
   */
  public onDeleteProfilePicture() {
    this.userService.deleteProfilePicture().subscribe({
      next: (response) => {
        this.profileImageService.emitProfileImageUpdated(
          response.profile_picture_url
        );
        this.notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
