import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '@app/core/models/group.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { GroupService } from '@app/core/services/entities/group.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta para crear un grupo
 */
@Component({
  selector: 'app-create-group-card',
  templateUrl: './create-group-card.component.html',
  providers: [GroupService],
})
export class CreateGroupCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Crear Grupo';

  /** Formulario para crear un grupo */
  public createGroupForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento que se emite cuando se crea un grupo */
  @Output() public groupCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _groupService: GroupService,
    private _notificationService: NotificationService
  ) {
    this.createGroupForm = this._fb.group({
      name: ['', Validators.required],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.createGroupForm;
  }

  /**
   * Envía el formulario para crear un grupo.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const group: Group = { id: '', name: this.form.value.name };

    this._groupService.create(group).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
        this.groupCreated.emit();
        this.createGroupForm.reset();
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
