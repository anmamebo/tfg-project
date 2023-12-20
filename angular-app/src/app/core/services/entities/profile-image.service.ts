import { Injectable, EventEmitter } from '@angular/core';

/**
 * Servicio que gestiona la imagen de perfil.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  /** Evento que se emite cuando se actualiza la imagen de perfil. */
  public profileImageUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  /**
   * Emite el evento de actualización de imagen de perfil.
   * @param {string} imageUrl URL de la imagen de perfil.
   */
  public emitProfileImageUpdated(imageUrl: string) {
    this.profileImageUpdated.emit(imageUrl);
  }
}
