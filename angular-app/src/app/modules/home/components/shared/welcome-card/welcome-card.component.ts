import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';

/**
 * Componente que muestra un mensaje de bienvenida al usuario
 */
@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
})
export class WelcomeCardComponent implements OnInit {
  /** El nombre de usuario del usuario logueado. */
  public name: string = 'Usuario';

  /** Saludo del día */
  public greetings: string = '';

  /** Mensaje personalizado */
  public customMessage: string = '';

  constructor(private _tokenStorageService: TokenStorageService) {}

  public ngOnInit(): void {
    this._getUser();
    this._setMessages();
  }

  /**
   * Establece mensajes personalizados según la hora del día.
   * @private
   * @returns {void}
   */
  private _setMessages(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      this.greetings = 'Buenos días';
      this.customMessage = '¡Que tengas un día lleno de energía y logros!';
    } else if (currentHour >= 12 && currentHour < 20) {
      this.greetings = 'Buenas tardes';
      this.customMessage =
        '¡Que tengas una tarde llena de productividad y satisfacción!';
    } else {
      this.greetings = 'Buenas noches';
      this.customMessage =
        '¡Que tengas una noche llena de paz y dulces sueños!';
    }
  }

  /**
   * Obtiene y actualiza el nombre del usuario si está disponible en el almacenamiento de tokens.
   * @private
   * @returns {void}
   */
  private _getUser(): void {
    let user = this._tokenStorageService.getUser();
    if (user && user.user && user.user.name) {
      this.name = user.user.name;
    }
  }
}
