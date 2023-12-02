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

  /**
   * Muestra un toast de advertencia con un mensaje.
   * @param message El mensaje que se mostrará en el toast de advertencia.
   */
  showWarningToast(message: string) {
    Swal.fire({
      icon: 'warning',
      title: message,
      ...this.toastOptions,
    });
  }

  /**
   * Muestra un dialogo de confirmación para eliminar un registro y ejecuta la función `onConfirm` si se confirma.
   * @param onConfirm Función que se ejecutará si se confirma la eliminación.
   */
  showConfirmDeleteDialog(onConfirm: () => void) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#435ebe",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El registro ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#435ebe",
        });
        onConfirm();
      }
    });
  }

  /**
   * Muestra un dialogo de confirmación para reactivar un registro y ejecuta la función `onConfirm` si se confirma.
   * @param onConfirm Función que se ejecutará si se confirma la desactivación.
   */
  showConfirmReactivateDialog(onConfirm: () => void) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#435ebe",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, activar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Activado!",
          text: "El registro ha sido activado.",
          icon: "success",
          confirmButtonColor: "#435ebe",
        });
        onConfirm();
      }
    });
  }
}
