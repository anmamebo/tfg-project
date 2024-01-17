import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { AdministrativeService } from 'src/app/core/services/entities/administrative.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de creación de un administrativo
 */
@Component({
  selector: 'app-create-administratives-card',
  templateUrl: './create-administratives-card.component.html',
  providers: [AdministrativeService],
})
export class CreateAdministrativesCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Administrativo';

  /** Formulario para la información del administrativo */
  public createAdministrativeForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _administrativeService: AdministrativeService,
    private _notificationService: NotificationService
  ) {
    this.createAdministrativeForm = this._fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
    });
  }

  get form() {
    return this.createAdministrativeForm;
  }

  /**
   * Maneja el envío del formulario para crear un nuevo administrativo.
   * Actualiza la información del nuevo administrativo en función de los datos ingresados en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let administrative: any = {
      name: this.form.value.name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      username: this.form.value.username,
    };

    this._administrativeService.create(administrative).subscribe({
      next: (response) => {
        this.form.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
