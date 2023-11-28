import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { INTEGER_REGEXP } from "src/app/core/constants/reg-exp";

// Servicios
import { RoomService } from "src/app/core/services/room.service";
import { DepartmentService } from "src/app/core/services/department.service";
import { NotificationService } from 'src/app/core/services/notification.service';


/**
 * Componente que representa la tarjeta de creación de una sala
 */
@Component({
  selector: 'app-create-rooms-card',
  templateUrl: './create-rooms-card.component.html',
  styleUrls: ['./create-rooms-card.component.scss'],
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
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {
    this.createRoomForm = this.formBuilder.group({
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
      allowSearchFilter: true
    };

    this.getDepartments();
  }

  get form() { return this.createRoomForm; }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const room: any = {
      name: this.form.value.name,
      description: this.form.value.description ? this.form.value.description : null,
      capacity: this.form.value.capacity ? this.form.value.capacity : null,
      type: this.form.value.type ? this.form.value.type : null,
      is_available: this.form.value.is_available,
      location: this.form.value.location,
      department: this.form.value.department[0].item_id
    };
    
    this.roomService.createRoom(room).subscribe({
      next: (data) => {
        this.form.reset();
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }

  /**
   * Obtiene los departamentos.
   */
  public getDepartments() {
    this.departmentService.getDepartments().subscribe({
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
