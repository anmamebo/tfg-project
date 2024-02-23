import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { INTEGER_REGEXP } from 'src/app/core/constants/regex.constants';
import { Department } from 'src/app/core/models/department.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { Room } from 'src/app/core/models/room.interface';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { RoomService } from 'src/app/core/services/entities/room.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de una sala
 */
@Component({
  selector: 'app-edit-info-rooms-card',
  templateUrl: './edit-info-rooms-card.component.html',
  providers: [RoomService, DepartmentService],
})
export class EditInfoRoomsCardComponent implements OnInit {
  /** Sala que se editará */
  @Input() public room: Room | null = null;

  /** Formulario para editar la información básica de una sala */
  public editInfoRoomForm: FormGroup = new FormGroup({});

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
  ) {}

  ngOnInit(): void {
    this.editInfoRoomForm = this._fb.group({
      name: [this.room?.name, [Validators.required, Validators.maxLength(50)]],
      description: [this.room?.description, [Validators.maxLength(255)]],
      capacity: [
        this.room?.capacity,
        [Validators.min(1), Validators.pattern(INTEGER_REGEXP)],
      ],
      type: [this.room?.type, [Validators.maxLength(50)]],
      is_available: [this.room?.is_available, Validators.required],
      location: [
        this.room?.location,
        [Validators.required, Validators.maxLength(50)],
      ],
      department: [
        [
          {
            item_id: this.room?.department?.id,
            item_text: this.room?.department?.name,
          },
        ],
        [Validators.required],
      ],
    });

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

  /** Obtiene el formulario */
  get form() {
    return this.editInfoRoomForm;
  }

  /**
   * Actualiza la información de una sala existente.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.room || !this.room.id) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener la sala.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.room.id,
      name: this.form.value.name,
      description: this.form.value.description || null,
      capacity: this.form.value.capacity || null,
      is_available: this.room.is_available,
      type: this.form.value.type || null,
      location: this.form.value.location,
      department: this.form.value.department[0].item_id,
    };

    this._roomService.update(this.room.id, updatedData).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
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
