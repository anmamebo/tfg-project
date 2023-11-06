import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Servicios
import { GroupService } from "src/app/core/services/group.service";
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Group } from "src/app/core/models/group.model";

/**
 * Componente que representa la tarjeta para crear un grupo
 */
@Component({
  selector: 'app-create-group-card',
  templateUrl: './create-group-card.component.html',
  styleUrls: ['./create-group-card.component.scss'],
  providers: [GroupService],
})
export class CreateGroupCardComponent implements OnInit {
  /**
   * Grupo que se creará
   */
  public group: Group = new Group('', '');

  /**
   * Formulario para crear un grupo
   */
  public createGroupForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  /**
   * Indica si se ha enviado el formulario
   */
  public submitted: Boolean = false;

  /**
   * Evento que se emite cuando se crea un grupo
   */
  @Output() public groupCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.createGroupForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Obtiene los controles del formulario
   * @returns Los controles del formulario
   */
  get form () {
    return this.createGroupForm.controls;
  }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit() {
    this.submitted = true;

    if (this.createGroupForm.invalid) {
      return;
    }

    this.group.name = this.createGroupForm['value'].name;

    this.groupService.createGroup(this.group).subscribe({
      next: (response) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(response.message);
        this.groupCreated.emit();
        this.createGroupForm.reset();
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
