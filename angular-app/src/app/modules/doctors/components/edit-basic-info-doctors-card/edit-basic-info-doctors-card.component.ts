import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDropdownSettings } from "ng-multiselect-dropdown";

// Servicios
import { DoctorService } from "src/app/core/services/doctor.service";
import { MedicalspecialtyService } from "src/app/core/services/medicalspecialty.service";
import { DepartmentService } from "src/app/core/services/department.service";
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Doctor } from "src/app/core/models/doctor.model";


/**
 * Componente que representa la tarjeta de edición de la
 * información básica de un médico
 */
@Component({
  selector: 'app-edit-basic-info-doctors-card',
  templateUrl: './edit-basic-info-doctors-card.component.html',
  styleUrls: ['./edit-basic-info-doctors-card.component.scss'],
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
  ) {}

  ngOnInit(): void {
    this.editBasicInfoDoctorForm = this.formBuilder.group({
      name: [this.doctor?.user?.name, Validators.required],
      last_name: [this.doctor?.user?.last_name, Validators.required],
      collegiate_number: [this.doctor?.collegiate_number, [Validators.required, Validators.maxLength(10)]],
      is_available: [this.doctor?.is_available, Validators.required],
      medical_specialties: [this.doctor?.medical_specialties?.map((item: {id: String, name: String}) => ({
        item_id: item.id,
        item_text: item.name
      }))],
      departments: [this.doctor?.departments?.map((item: {id: String, name: String}) => ({
        item_id: item.id,
        item_text: item.name
      }))],
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
      allowSearchFilter: true
    };

    this.getMedicalSpecialties();
    this.getDepartments();
  }
  

  /** Obtiene el formulario */
  get form() { return this.editBasicInfoDoctorForm; }

  /**
   * Maneja la acción de envio del formulario
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.doctor?.id,
      collegiate_number: this.form.value.collegiate_number,
      is_available: this.form.value.is_available,
      user: {
        id: this.doctor?.user?.id,
        name: this.form.value.name,
        last_name: this.form.value.last_name,
      },
      medical_specialties: this.form.value.medical_specialties.map((item: {item_id: String, item_text: String}) => item.item_id),
      departments: this.form.value.departments.map((item: {item_id: String, item_text: String}) => item.item_id),
    }

    this.doctorService.updateDoctor(updatedData).subscribe({
      next: (data) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }

  /**
 * Obtiene las especialidades médicas.
 */
  public getMedicalSpecialties() {
    this.medicalSpecialtyService.getMedicalSpecialties().subscribe({
      next: (data) => {
        this.medicalSpecialties = data.map((item: {id: String, name: String}) => ({
          item_id: item.id,
          item_text: item.name
        }))
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
