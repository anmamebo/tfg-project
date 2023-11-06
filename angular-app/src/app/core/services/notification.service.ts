import { Injectable } from '@angular/core';

import Swal, { SweetAlertOptions } from 'sweetalert2';

/**
 * Servicio para mostrar notificaciones estilo toast utilizando SweetAlert2.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * Opciones de configuración para los toasts.
   */
  private toastOptions: SweetAlertOptions = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  };

  constructor() {}

  /**
   * Muestra un toast de éxito con un mensaje.
   * @param message El mensaje que se mostrará en el toast de éxito.
   */
  showSuccessToast(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      ...this.toastOptions,
    });
  }

  /**
   * Muestra un toast de error con un mensaje.
   * @param message El mensaje que se mostrará en el toast de error.
   */
  showErrorToast(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      ...this.toastOptions,
    });
  }
}
