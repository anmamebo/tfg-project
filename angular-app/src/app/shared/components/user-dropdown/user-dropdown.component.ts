import { Component, OnInit } from '@angular/core';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TokenStorageService } from '@app/core/services/auth/token-storage.service';

/**
 * Componente para el dropdown del usuario logueado.
 */
@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  providers: [AuthService, TokenStorageService],
})
export class UserDropdownComponent implements OnInit {
  /** El nombre de usuario del usuario logueado. */
  public username: string = '';

  constructor(
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this._getUser();
  }

  /**
   * Cierra la sesión del usuario.
   * @public
   * @returns {void}
   */
  public logout(): void {
    this._authService.logOut().subscribe({
      next: (response: MessageResponse) => {
        // Recargar la página después del cierre de sesión.
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  /**
   * Obtiene la información del usuario desde el servicio de almacenamiento de tokens y establece el nombre de usuario.
   * @private
   * @returns {void}
   */
  private _getUser(): void {
    let user = this._tokenStorageService.getUser();
    if (user && user.username) {
      this.username = user.name;
    }
  }
}
