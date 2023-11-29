import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { INTEGER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { RoomService } from "src/app/core/services/room.service";
import { DepartmentService } from "src/app/core/services/department.service";
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Room } from "src/app/core/models/room.model";


/**
 * Componente que representa la tarjeta de edición de la
 * información básica de una sala
 */
@Component({
  selector: 'app-edit-info-rooms-card',
  templateUrl: './edit-info-rooms-card.component.html',
  styleUrls: ['./edit-info-rooms-card.component.scss'],
  providers: [RoomService, DepartmentService],
})
export class EditInfoRoomsCardComponent implements OnInit {
  /** Título de la tarjeta */	
  public titleCard: string = 'Información Básica';

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
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editInfoRoomForm = this.formBuilder.group({
      name: [this.room?.name, [Validators.required, Validators.maxLength(50)]],
      description: [this.room?.description, [Validators.maxLength(255)]],
      capacity: [this.room?.capacity, [Validators.min(1), Validators.pattern(INTEGER_REGEXP)]],
      type: [this.room?.type, [Validators.maxLength(50)]],
      is_available: [this.room?.is_available, Validators.required],
      location: [this.room?.location, [Validators.required, Validators.maxLength(50)]],
      department: [[
        {
          item_id: this.room?.department?.id,
          item_text: this.room?.department?.name
        }
      ], [Validators.required]],
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'No hay datos disponibles',
      noFilteredDataAvailablePlaceholderText: 'No hay datos disponibles',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

    this.getDepartments();
  }

  /** Obtiene el formulario */
  get form() { return this.editInfoRoomForm; }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.room?.id,
      name: this.form.value.name,
      description: this.form.value.description ? this.form.value.description : null,
      capacity: this.form.value.capacity ? this.form.value.capacity : null,
      is_available: this.room?.is_available,
      type: this.form.value.type ? this.form.value.type : null,
      location: this.form.value.location,
      department: this.form.value.department[0].item_id,
    };

    this.roomService.update(this.room!.id, updatedData).subscribe({
      next: (data: any) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error: any) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }

  /**
   * Obtiene los departamentos.
   */
  public getDepartments() {
    this.departmentService.getItems().subscribe({
      next: (data) => {
        this.departments = data.map((item: {id: String, name: String}) => ({
          item_id: item.id,
          item_text: item.name
        }))
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
