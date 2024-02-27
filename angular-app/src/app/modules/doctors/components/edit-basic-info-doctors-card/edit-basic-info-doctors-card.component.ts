import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '@app/core/models/department.interface';
import { Doctor } from '@app/core/models/doctor.interface';
import { MedicalSpecialty } from '@app/core/models/medical-specialty.interface';
import { ListResponse } from '@app/core/models/response/list-response.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { DepartmentService } from '@app/core/services/entities/department.service';
import { DoctorService } from '@app/core/services/entities/doctor.service';
import { MedicalspecialtyService } from '@app/core/services/entities/medicalspecialty.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

/**
 * Componente que representa la tarjeta de edición de la
 * información básica de un médico
 */
@Component({
  selector: 'app-edit-basic-info-doctors-card',
  templateUrl: './edit-basic-info-doctors-card.component.html',
  providers: [DoctorService, MedicalspecialtyService, DepartmentService],
})
export class EditBasicInfoDoctorsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Médico que se editará */
  @Input() public doctor: Doctor | null = null;

  /** Formulario para editar la información básica de un médico */
  public editBasicInfoDoctorForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para actualizar los datos del médico */
  @Output() public refreshDoctor: EventEmitter<void> = new EventEmitter<void>();

  /** Especialidades médicas */
  public medicalSpecialties: any = [];

  /** Departamentos */
  public departments: any = [];

  /** Opciones del desplegable de seleccionar */
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private _fb: FormBuilder,
    private _doctorService: DoctorService,
    private _medicalSpecialtyService: MedicalspecialtyService,
    private _departmentService: DepartmentService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editBasicInfoDoctorForm = this._fb.group({
      name: [this.doctor?.user?.name, Validators.required],
      last_name: [this.doctor?.user?.last_name, Validators.required],
      collegiate_number: [
        this.doctor?.collegiate_number,
        [Validators.required, Validators.maxLength(10)],
      ],
      is_available: [this.doctor?.is_available, Validators.required],
      medical_specialties: [
        this.doctor?.medical_specialties?.map(
          (item: { id: String; name: String }) => ({
            item_id: item.id,
            item_text: item.name,
          })
        ),
      ],
      departments: [
        this.doctor?.departments?.map((item: { id: String; name: String }) => ({
          item_id: item.id,
          item_text: item.name,
        })),
      ],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'No hay datos disponibles',
      noFilteredDataAvailablePlaceholderText: 'No hay datos disponibles',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    };

    this.getMedicalSpecialties();
    this.getDepartments();
  }

  /** Obtiene el formulario */
  get form() {
    return this.editBasicInfoDoctorForm;
  }

  /**
   * Maneja el envío del formulario para actualizar la información de un médico existente.
   * Actualiza los datos del médico en función de la información ingresada en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (
      !this.doctor ||
      !this.doctor.id ||
      !this.doctor.user ||
      !this.doctor.user.id
    ) {
      this._notificationService.showErrorToast(
        'No se ha podido obtener el médico.'
      );
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.doctor.id,
      collegiate_number: this.form.value.collegiate_number,
      is_available: this.form.value.is_available,
      user: {
        id: this.doctor.user.id,
        name: this.form.value.name,
        last_name: this.form.value.last_name,
      },
      medical_specialties: this.form.value.medical_specialties.map(
        (item: { item_id: String; item_text: String }) => item.item_id
      ),
      departments: this.form.value.departments.map(
        (item: { item_id: String; item_text: String }) => item.item_id
      ),
    };

    this._doctorService.update(this.doctor.id, updatedData).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this._notificationService.showSuccessToast(response.message);
        this.refreshDoctor.emit();
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Obtiene las especialidades médicas desde el servicio y actualiza la lista de especialidades disponibles.
   * @returns {void}
   * @public
   */
  public getMedicalSpecialties(): void {
    this._medicalSpecialtyService.getItems().subscribe({
      next: (response: ListResponse<MedicalSpecialty>) => {
        if (Array.isArray(response)) {
          this.medicalSpecialties = response.map(
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

  /**
   * Obtiene los departamentos desde el servicio y actualiza la lista de departamentos disponibles.
   * @returns {void}
   * @public
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
