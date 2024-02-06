import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbMedicalSpecialtiesEditData } from 'src/app/core/constants/breadcrumb-data.constants';
import { MedicalSpecialty } from 'src/app/core/models/medical-specialty.interface';

/**
 * Componente para la página de edición de una especialidad médica.
 */
@Component({
  selector: 'app-medical-specialties-edit-page',
  templateUrl: './medical-specialties-edit-page.component.html',
})
export class MedicalSpecialtiesEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar especialidad médica';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes editar una especialidad médica.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbMedicalSpecialtiesEditData;

  /** Especialidad médica a editar. */
  public medicalSpecialty: MedicalSpecialty | null = null;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medicalSpecialty = this._route.snapshot.data['data']; // Obtiene los datos de la especialidad médica desde el resolver
  }
}
