import { Component, OnInit } from '@angular/core';

// Servicios
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';

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
   * Método para cerrar la sesión del usuario.
   */
  public logout(): void {
    this._authService.logOut().subscribe({
      next: (data) => {
        // Recargar la página después del cierre de sesión.
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  /**
   * Método para obtener el usuario logueado y actualizar el nombre de usuario.
   */
  private _getUser(): void {
    let user = this._tokenStorageService.getUser();
    if (user && user.user && user.user.username) {
      this.username = user.user.name;
    }
  }
}
