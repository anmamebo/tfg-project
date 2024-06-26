import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

/**
 * Servicio para mostrar notificaciones estilo toast utilizando SweetAlert2.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /** Opciones de configuración para los toasts. */
  private _toastOptions: SweetAlertOptions = {
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
   * @param {string} message El mensaje que se mostrará en el toast de éxito.
   */
  showSuccessToast(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      ...this._toastOptions,
    });
  }

  /**
   * Muestra un toast de error con un mensaje.
   * @param {string} message El mensaje que se mostrará en el toast de error.
   */
  showErrorToast(message: string): void {
    Swal.fire({
      icon: 'error',
      title: message,
      ...this._toastOptions,
    });
  }

  /**
   * Muestra un toast de advertencia con un mensaje.
   * @param {string} message El mensaje que se mostrará en el toast de advertencia.
   */
  showWarningToast(message: string): void {
    Swal.fire({
      icon: 'warning',
      title: message,
      ...this._toastOptions,
    });
  }

  /**
   * Muestra un dialogo de confirmación para eliminar un registro y ejecuta la función `onConfirm` si se confirma.
   * @param {() => void} onConfirm Función que se ejecutará si se confirma la eliminación.
   */
  showConfirmDeleteDialog(onConfirm: () => void): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#435ebe',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonColor: '#435ebe',
        });
        onConfirm();
      }
    });
  }

  /**
   * Muestra un dialogo de confirmación para reactivar un registro y ejecuta la función `onConfirm` si se confirma.
   * @param {() => void} onConfirm Función que se ejecutará si se confirma la desactivación.
   */
  showConfirmReactivateDialog(onConfirm: () => void): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#435ebe',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Activado!',
          text: 'El registro ha sido activado.',
          icon: 'success',
          confirmButtonColor: '#435ebe',
        });
        onConfirm();
      }
    });
  }

  /**
   * Muestra un dialogo de confirmación genérico y ejecuta la función `onConfirm` si se confirma.
   * @param {string} title Título del dialogo.
   * @param {string} text Texto del dialogo.
   * @param {string} confirmButtonText Texto del botón de confirmación.
   * @param {string} successTitle Título del dialogo de éxito.
   * @param {string} successText Texto del dialogo de éxito.
   * @param {string} cancelButtonText Texto del botón de cancelación.
   * @param {() => void} onConfirm Función que se ejecutará si se confirma.
   */
  showConfirmGenericDialog(
    title: string,
    text: string,
    confirmButtonText: string,
    successTitle: string,
    successText: string,
    cancelButtonText: string = 'Cancelar',
    onConfirm: () => void
  ): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#435ebe',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: successTitle,
          text: successText,
          icon: 'success',
          confirmButtonColor: '#435ebe',
        });
        onConfirm();
      }
    });
  }
}
