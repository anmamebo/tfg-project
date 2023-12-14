import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { GroupService } from 'src/app/core/services/group.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Group } from 'src/app/core/models/group.model';

/**
 * Componente que representa la tarjeta para editar un grupo
 */
@Component({
  selector: 'app-edit-group-card',
  templateUrl: './edit-group-card.component.html',
  providers: [GroupService],
})
export class EditGroupCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Editar Grupo';

  /** Grupo que se editará */
  @Input() public group: Group = new Group('', '');

  /** Formulario para editar un grupo */
  public editGroupForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _groupService: GroupService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editGroupForm = this._fb.group({
      name: [this.group.name, Validators.required],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.editGroupForm;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const groupEdited: Group = new Group(this.group.id, this.form.value.name);

    this._groupService.update(this.group.id, groupEdited).subscribe({
      next: (data) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error);
      },
    });
  }
}
