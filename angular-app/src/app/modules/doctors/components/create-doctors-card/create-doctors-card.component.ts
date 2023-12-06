import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

// Servicios
import { DoctorService } from 'src/app/core/services/doctor.service';
import { MedicalspecialtyService } from 'src/app/core/services/medicalspecialty.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private medicalSpecialtyService: MedicalspecialtyService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {
    this.createDoctorForm = this.formBuilder.group({
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
   * Maneja la acción de enviar el formulario.
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
      medical_specialties: this.form.value.medical_specialties.map(
        (item: { item_id: String; item_text: String }) => item.item_id
      ),
      departments: this.form.value.departments.map(
        (item: { item_id: String; item_text: String }) => item.item_id
      ),
    };

    this.doctorService.create(doctor).subscribe({
      next: (data) => {
        this.form.reset();
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Obtiene las especialidades médicas.
   */
  public getMedicalSpecialties() {
    this.medicalSpecialtyService.getMedicalSpecialties().subscribe({
      next: (data) => {
        this.medicalSpecialties = data.map(
          (item: { id: String; name: String }) => ({
            item_id: item.id,
            item_text: item.name,
          })
        );
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Obtiene los departamentos.
   */
  public getDepartments() {
    this.departmentService.getItems().subscribe({
      next: (data) => {
        this.departments = data.map((item: { id: String; name: String }) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
