import { Component, Input, OnInit } from '@angular/core';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { UserService } from 'src/app/core/services/user.service';
import { ProfileImageService } from 'src/app/core/services/profile-image.service';

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
  public API_URL = API_URL.url.replace(/\/$/, '');

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
      next: (data) => {
        this.profile_picture = data.profile_picture;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this._checkProfilePicture();
      },
    });
  }

  /**
   * Método para obtener la primera letra del nombre del usuario.
   * @returns string la primera letra del nombre del usuario.
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
   * Método para verificar si el usuario tiene una imagen de perfil.
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
