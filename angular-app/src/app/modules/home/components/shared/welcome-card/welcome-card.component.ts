import { Component, OnInit } from '@angular/core';

// Servicios
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

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
   * Método para establecer el saludo y el mensaje personalizado.
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
   * Método para obtener el nombre del usuario logueado.
   */
  private _getUser(): void {
    let user = this._tokenStorageService.getUser();
    if (user && user.user && user.user.name) {
      this.name = user.user.name;
    }
  }
}