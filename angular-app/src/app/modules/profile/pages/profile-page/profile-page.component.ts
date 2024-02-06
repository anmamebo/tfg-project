import { Component, OnInit } from '@angular/core';

// Servicios
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { UserService } from 'src/app/core/services/entities/user.service';

// Modelos
import { User } from 'src/app/core/models/user.interface';

import { breadcrumbProfileData } from 'src/app/core/constants/breadcrumb-data.constants';

/**
 * Componente que representa la página de perfil de usuario.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [UserService, TokenStorageService],
})
export class ProfilePageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Mi Perfil';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes ver y editar tu perfil de usuario.';

  /** Objeto `User` que almacena los datos del usuario actual. */
  public user: User | null = null;

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbProfileData;

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Obtiene los detalles del usuario actual y actualiza la propiedad 'user'.
   * Actualiza los detalles del usuario en el servicio de almacenamiento de tokens.
   * @public
   * @returns {void}
   */
  public getUser(): void {
    const userSession = this._tokenStorageService.getUser();

    if (userSession.user) {
      this._userService.getItemById(userSession.user.id).subscribe({
        next: (user: User) => {
          this.user = user;
          this._tokenStorageService.updateUser(user);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
