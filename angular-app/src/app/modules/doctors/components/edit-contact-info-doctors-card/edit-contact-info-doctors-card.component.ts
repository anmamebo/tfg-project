import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Servicios
import { NotificationService } from "src/app/core/services/notification.service";
import { DoctorService } from "src/app/core/services/doctor.service";

// Modelos
import { Doctor } from "src/app/core/models/doctor.model";


/**
 * Componente que representa la tarjeta de edición de la
 * información de contacto de un doctor.
 */
@Component({
  selector: 'app-edit-contact-info-doctors-card',
  templateUrl: './edit-contact-info-doctors-card.component.html',
  styleUrls: ['./edit-contact-info-doctors-card.component.scss'],
  providers: [DoctorService]
})
export class EditContactInfoDoctorsCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Información de Contacto';

  /** Doctor que se editará */
  @Input() public doctor: Doctor | null = null;

  /** Formulario para editar la información de contacto de un doctor */
  public editContactInfoDoctorForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editContactInfoDoctorForm = this.formBuilder.group({
      username: [this.doctor?.user?.username, Validators.required],
      email: [this.doctor?.user?.email, [Validators.required, Validators.email]],
    });
  }

  /** Obtiene el formulario */
  get form () { return this.editContactInfoDoctorForm; }

  /**
   * Maneja la acción de enviar el formulario.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updatedData: any = {
      id: this.doctor?.id,
      user: {
        id: this.doctor?.user?.id,
        username: this.doctor?.user?.username,
        email: this.form.value.email
      }
    };

    this.doctorService.update(this.doctor!.id, updatedData).subscribe({
      next: (data) => {
        this.submitted = false;
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.notificationService.showErrorToast(error.message);
      }
    });
  }
}
