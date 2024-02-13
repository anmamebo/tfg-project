import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Department } from 'src/app/core/models/department.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de creación de una especialidad médica
 */
@Component({
  selector: 'app-create-medical-specialties-card',
  templateUrl: './create-medical-specialties-card.component.html',
  providers: [MedicalspecialtyService, DepartmentService],
})
export class CreateMedicalSpecialtiesCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Especialidad Médica';

  /** Formulario para la información de la especialidad médica */
  public createMedicalSpecialtyForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Departamentos */
  public departments: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private _fb: FormBuilder,
    private _medicalSpecialtyService: MedicalspecialtyService,
    private _departmentService: DepartmentService,
    private _notificationService: NotificationService
  ) {
    this.createMedicalSpecialtyForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
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
    return this.createMedicalSpecialtyForm;
  }

  /**
   * Maneja el envío del formulario para la creación de una nueva especialidad médica.
   * Crea una nueva especialidad médica utilizando la información ingresada en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const medicalSpecialty: any = {
      name: this.form.value.name,
      description: this.form.value.description || null,
      department: this.form.value.department[0].item_id,
    };

    this._medicalSpecialtyService.create(medicalSpecialty).subscribe({
      next: (response: MessageResponse) => {
        this.form.reset();
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
