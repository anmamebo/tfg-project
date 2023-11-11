import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/core/services/user.service';

import { User } from 'src/app/core/models/user.model';
import { breadcrumbProfileData } from "src/app/core/constants/breadcrumb-data";

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
  /**
   * Título de la página.
   */
  public pageTitle: string = 'Mi Perfil';

  /**
   * Descripción de la página.
   */
  public pageDescription: string = 'Aquí puedes ver y editar tu perfil de usuario.';

  /**
   * Objeto `User` que almacena los datos del usuario actual.
   */
  public user: User | null = null;

  /**
   * Datos para el componente `app-breadcrumb`.
   */
  public breadcrumbData = breadcrumbProfileData

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Obtiene los datos del usuario actual y los asigna a la propiedad `user`.
   * @private
   */
  public getUser(): void {
    const userSession = this.tokenStorageService.getUser();

    if (userSession.user) {
      this.userService.getUserById(userSession.user.id).subscribe({
        next: (user: User) => {
          this.user = user;
          this.tokenStorageService.updateUser(user);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
