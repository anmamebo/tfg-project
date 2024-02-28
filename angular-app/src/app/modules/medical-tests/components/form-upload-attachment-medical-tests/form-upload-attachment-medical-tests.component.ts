import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ATTACHMENTS_ALLOWED_FILE_EXTENSIONS } from '@app/core/constants/file-extensions.constants';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { MedicalTestService } from '@app/core/services/entities/medicaltest.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import Validation from '@app/core/validators/general.validator';

/**
 * Componente para el formulario de subida de ficheros adjuntos de una prueba médica.
 */
@Component({
  selector: 'app-form-upload-attachment-medical-tests',
  templateUrl: './form-upload-attachment-medical-tests.component.html',
  providers: [MedicalTestService],
})
export class FormUploadAttachmentMedicalTestsComponent {
  /** Id de la prueba médica */
  @Input() public medicalTestId: string | null = null;

  /** Formulario para la subida de ficheros adjuntos */
  public uploadAttachmentForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario */
  public submitted: boolean = false;

  /** Evento para indicar que se ha subido un fichero adjunto */
  @Output() public uploadedAttachment: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _medicalTestService: MedicalTestService,
    private _notificationService: NotificationService
  ) {
    this.uploadAttachmentForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(255)]],
      file: [null, [Validators.required]],
      fileSource: [
        '',
        [
          Validators.required,
          Validation.fileExtension(ATTACHMENTS_ALLOWED_FILE_EXTENSIONS),
          Validation.fileSizeInMB(6),
        ],
      ],
    });
  }

  /** Obtiene el formulario. */
  get form() {
    return this.uploadAttachmentForm;
  }

  /**
   * Maneja el cambio de archivo de entrada para el componente de selección de avatar.
   * Actualiza el valor del archivo seleccionado en el formulario del avatar.
   * @param {any} event - Evento de cambio de archivo del componente de selección de archivos.
   * @returns {void}
   * @public
   */
  public onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadAttachmentForm.patchValue({
        fileSource: file,
      });
    }
  }

  /**
   * Ejecuta la lógica al enviar el formulario para subir un fichero adjunto.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.medicalTestId || this.form.invalid) {
      return;
    }

    let attachment: any = {
      name: this.form.value.name,
      description: this.form.value.description || null,
      file: this.form.value.fileSource as File,
      medical_test: this.medicalTestId,
    };

    this._medicalTestService.uploadMedicalTestAttachment(attachment).subscribe({
      next: (response: MessageResponse) => {
        this.uploadAttachmentForm.reset();
        this.submitted = false;
        this.uploadedAttachment.emit();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
