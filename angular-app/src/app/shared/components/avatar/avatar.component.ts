import { Component, Input, OnInit } from '@angular/core';

import { MEDIA_URL } from 'src/app/core/constants/API-URL.constants';

// Servicios
import { UserService } from 'src/app/core/services/entities/user.service';
import { ProfileImageService } from 'src/app/core/services/entities/profile-image.service';

/**
 * Componente para mostrar el avatar de un usuario.
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  providers: [UserService],
})
export class AvatarComponent implements OnInit {
  /** URL de la api. */
  public MEDIA_URL = MEDIA_URL;

  /* URL de la imagen de perfil. */
  public profile_picture: string | null = null;

  /** Nombre del usuario */
  @Input() name: string = '';

  /** Mostrar el estado del usuario */
  @Input() status: boolean = false;

  /** Clases adicionales para el div del avatar */
  @Input() extraClasses: string[] = [];

  constructor(
    private _userService: UserService,
    private _profileImageService: ProfileImageService
  ) {
    this._profileImageService.profileImageUpdated.subscribe(
      (imageUrl: string) => {
        this.profile_picture = imageUrl;
      }
    );
  }

  ngOnInit(): void {
    this._userService.getProfilePicture().subscribe({
      next: (response: any) => {
        this.profile_picture = response.profile_picture;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this._checkProfilePicture();
      },
    });
  }

  /**
   * Obtiene las iniciales del nombre del paciente.
   * @returns {string} Las iniciales en mayúsculas del nombre del paciente.
   */
  public getFirstLetter(): string {
    const names = this.name.split(' '); // Divide el nombre en palabras
    let initials = '';
    for (const name of names) {
      initials += name.charAt(0); // Obtiene la primera letra de cada palabra
    }
    return initials.toUpperCase(); // Convierte las iniciales a mayúsculas
  }

  /**
   * Verifica si hay una imagen de perfil y agrega un color al fondo si no hay ninguna.
   * @private
   * @returns {void}
   */
  private _checkProfilePicture(): void {
    if (!this.profile_picture) {
      this.extraClasses.push('bg-warning');
    } else {
      this.extraClasses = this.extraClasses.filter(
        (className) => className !== 'bg-warning'
      );
    }
  }
}
