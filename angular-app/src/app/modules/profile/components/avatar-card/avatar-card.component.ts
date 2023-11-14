import { Component, Input } from '@angular/core';

// Models 
import { User } from 'src/app/core/models/user.model';


/**
 * Componente que representa una tarjeta de avatar de usuario.
 */
@Component({
  selector: 'app-avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
})
export class AvatarCardComponent {
  /**
   * Propiedad de entrada que recibe un objeto `User` para mostrar su avatar y detalles.
   */
  @Input() user: User = new User('', '', '', '');

  constructor() {}
}
