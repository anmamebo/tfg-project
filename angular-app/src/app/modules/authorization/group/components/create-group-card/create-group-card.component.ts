import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { GroupService } from 'src/app/core/services/group.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Group } from 'src/app/core/models/group.model';

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
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private notificationService: NotificationService
  ) {
    this.createGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.createGroupForm;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const group: Group = new Group('', this.form.value.name);

    this.groupService.create(group).subscribe({
      next: (response) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(response.message);
        this.groupCreated.emit();
        this.createGroupForm.reset();
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
