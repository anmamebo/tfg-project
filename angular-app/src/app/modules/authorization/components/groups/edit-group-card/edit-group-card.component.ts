import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Servicios
import { GroupService } from "src/app/core/services/group.service";
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Group } from "src/app/core/models/group.model";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Componente que representa la tarjeta para editar un grupo
 */
@Component({
  selector: 'app-edit-group-card',
  templateUrl: './edit-group-card.component.html',
  styleUrls: ['./edit-group-card.component.scss']
})
export class EditGroupCardComponent implements OnInit {

  /**
   * Grupo que se editará
   */
  @Input() public group: Group = new Group('', '');

  /**
   * Grupo editado
   */
  public groupEdited: Group = new Group('', '');

  /**
   * Formulario para editar un grupo
   */
  public editGroupForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  /**
   * Indica si se ha enviado el formulario
   */
  public submitted: Boolean = false;

  /**
   * Evento que se emite cuando se edita un grupo
   */
  @Output() public groupEditedEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {    
    this.editGroupForm = this.formBuilder.group({
      name: [this.group.name, Validators.required]
    });
  }

  /**
   * Obtiene los controles del formulario
   * @returns Los controles del formulario
   */
  get form() {
    return this.editGroupForm.controls;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit() {
    this.submitted = true;

    if (this.editGroupForm.invalid) {
      return;
    }

    this.groupEdited.id = this.group.id;
    this.groupEdited.name = this.editGroupForm.value.name;

    this.groupService.updateGroup(this.groupEdited).subscribe({
      next: (data) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
        this.groupEditedEvent.emit(this.groupEdited.id);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error);
      },
    });
  }

}
