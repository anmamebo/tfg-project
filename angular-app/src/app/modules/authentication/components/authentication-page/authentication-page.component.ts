import { Component, Input } from '@angular/core';

/**
 * Componente para la página de autenticación
 */
@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
})
export class AuthenticationPageComponent {
  /** Título */
  @Input() public title: string = '';

  /** Subtítulo */
  @Input() public subtitle: string = '';
}
