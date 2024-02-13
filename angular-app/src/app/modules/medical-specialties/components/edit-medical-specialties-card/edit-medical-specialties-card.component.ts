import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Department } from 'src/app/core/models/department.interface';
import { MedicalSpecialty } from 'src/app/core/models/medical-specialty.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de una especialidad médica
 */
@Component({
  selector: 'app-edit-medical-specialties-card',
  templateUrl: './edit-medical-specialties-card.component.html',
  providers: [MedicalspecialtyService, DepartmentService],
})
export class EditMedicalSpecialtiesCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Especialidad médica que se editará */
  @Input() public medicalSpecialty: MedicalSpecialty | null = null;

  /** Formulario para editar la información básica de una especialidad médica */
  public editMedicalSpecialtyForm: FormGroup = new FormGroup({});

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
  ) {}

  ngOnInit(): void {
    this.editMedicalSpecialtyForm = this._fb.group({
      name: [
        this.medicalSpecialty?.name,
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [
        this.medicalSpecialty?.description,
        [Validators.maxLength(255)],
      ],
      department: [
        [
          {
            item_id: this.medicalSpecialty?.department?.id,
            item_text: this.medicalSpecialty?.department?.name,
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
    return this.editMedicalSpecialtyForm;
  }

  /**
   * Maneja el envío del formulario para la actualización de una especialidad médica existente.
   * Actualiza la información de la especialidad médica en función de los datos ingresados en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.medicalSpecialty || !this.medicalSpecialty.id) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener la sala.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updateMedicalSpecialty: MedicalSpecialty = {
      id: this.medicalSpecialty.id,
      name: this.form.value.name,
      description: this.form.value.description || null,
      department: this.form.value.department[0].item_id,
    };

    this._medicalSpecialtyService
      .update(this.medicalSpecialty.id, updateMedicalSpecialty)
      .subscribe({
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
