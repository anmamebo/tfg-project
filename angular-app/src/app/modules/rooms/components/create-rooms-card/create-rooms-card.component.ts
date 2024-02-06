import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { INTEGER_REGEXP } from 'src/app/core/constants/regex.constants';
import { Department } from 'src/app/core/models/department.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { RoomService } from 'src/app/core/services/entities/room.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de creación de una sala
 */
@Component({
  selector: 'app-create-rooms-card',
  templateUrl: './create-rooms-card.component.html',
  providers: [RoomService, DepartmentService],
})
export class CreateRoomsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Sala';

  /** Formulario para la información de la sala */
  public createRoomForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Departamentos */
  public departments: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private _fb: FormBuilder,
    private _roomService: RoomService,
    private _departmentService: DepartmentService,
    private _notificationService: NotificationService
  ) {
    this.createRoomForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
      capacity: ['', [Validators.min(1), Validators.pattern(INTEGER_REGEXP)]],
      type: ['', [Validators.maxLength(50)]],
      is_available: [true, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      department: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'No hay datos disponibles',
      noFilteredDataAvailablePlaceholderText: 'No hay datos disponibles',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    };

    this.getDepartments();
  }

  get form() {
    return this.createRoomForm;
  }

  /**
   * Maneja la presentación del formulario para la creación de una sala.
   * Si el formulario es válido, crea una nueva sala con la información proporcionada.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const room: any = {
      name: this.form.value.name,
      description: this.form.value.description || null,
      capacity: this.form.value.capacity || null,
      type: this.form.value.type || null,
      is_available: this.form.value.is_available,
      location: this.form.value.location,
      department: this.form.value.department[0].item_id,
    };

    this._roomService.create(room).subscribe({
      next: (response: MessageResponse) => {
        this.form.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Obtiene la lista de departamentos y los asigna a la propiedad 'departments'.
   * @public
   * @returns {void}
   */
  public getDepartments(): void {
    this._departmentService.getItems().subscribe({
      next: (response: ListResponse<Department>) => {
        if (Array.isArray(response)) {
          this.departments = response.map(
            (item: { id: String; name: String }) => ({
              item_id: item.id,
              item_text: item.name,
            })
          );
        }
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
