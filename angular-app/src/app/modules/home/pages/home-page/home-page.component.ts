import { Component } from '@angular/core';
import { ROLES } from '@app/core/constants/roles.constants';

/**
 * Componente para la página de inicio.
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  /** Rol de administrativo. */
  public readonly ADMINISTRATIVE = ROLES.ADMIN;

  /** Rol de médico. */
  public readonly DOCTOR = ROLES.DOCTOR;

  /** Rol de paciente. */
  public readonly PATIENT = ROLES.PATIENT;

  constructor() {}
}
