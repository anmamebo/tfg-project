import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

// Servicios
import { DoctorService } from 'src/app/core/services/entities/doctor.service';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { DepartmentService } from 'src/app/core/services/entities/department.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de creación de un médico
 */
@Component({
  selector: 'app-create-doctors-card',
  templateUrl: './create-doctors-card.component.html',
  providers: [DoctorService, MedicalspecialtyService, DepartmentService],
})
export class CreateDoctorsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Formulario Médico';

  /** Formulario para la información del médico */
  public createDoctorForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

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
  ) {
    this.createDoctorForm = this._fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      collegiate_number: ['', [Validators.required, Validators.maxLength(10)]],
      is_available: [true, Validators.required],
      medical_specialties: [[]],
      departments: [[]],
    });
  }

  ngOnInit(): void {
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

  get form() {
    return this.createDoctorForm;
  }

  /**
   * Maneja el envío del formulario para crear un nuevo doctor.
   * Actualiza la información del nuevo doctor en función de los datos ingresados en el formulario.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let doctor: any = {
      user: {
        name: this.form.value.name,
        last_name: this.form.value.last_name,
        email: this.form.value.email,
      },
      collegiate_number: this.form.value.collegiate_number,
      is_available: this.form.value.is_available,
      medical_specialties: this.form.value.medical_specialties
        ? this.form.value.medical_specialties.map(
            (item: { item_id: String; item_text: String }) => item.item_id
          )
        : [],
      departments: this.form.value.departments
        ? this.form.value.departments.map(
            (item: { item_id: String; item_text: String }) => item.item_id
          )
        : [],
    };

    this._doctorService.create(doctor).subscribe({
      next: (data) => {
        this.form.reset();
        this.submitted = false;
        this._notificationService.showSuccessToast(data.message);
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
  public getMedicalSpecialties() {
    this._medicalSpecialtyService.getItems().subscribe({
      next: (data) => {
        this.medicalSpecialties = data.map(
          (item: { id: String; name: String }) => ({
            item_id: item.id,
            item_text: item.name,
          })
        );
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
  public getDepartments() {
    this._departmentService.getItems().subscribe({
      next: (data) => {
        this.departments = data.map((item: { id: String; name: String }) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
