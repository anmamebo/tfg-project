import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '@app/core/models/doctor.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { DoctorService } from '@app/core/services/entities/doctor.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';

/**
 * Componente que representa la tarjeta de edición de la
 * información de contacto de un doctor.
 */
@Component({
  selector: 'app-edit-contact-info-doctors-card',
  templateUrl: './edit-contact-info-doctors-card.component.html',
  providers: [DoctorService],
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

  /** Evento para actualizar los datos del médico */
  @Output() public refreshDoctor: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _doctorService: DoctorService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editContactInfoDoctorForm = this._fb.group({
      username: [this.doctor?.user?.username, Validators.required],
      email: [
        this.doctor?.user?.email,
        [Validators.required, Validators.email],
      ],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.editContactInfoDoctorForm;
  }

  /**
   * Maneja el envío del formulario para actualizar la información del médico, incluyendo su correo electrónico.
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
      user: {
        id: this.doctor.user.id,
        username: this.doctor.user.username,
        email: this.form.value.email,
      },
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
}
