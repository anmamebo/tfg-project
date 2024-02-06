import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalSpecialtiesRoutingModule } from './medical-specialties-routing.module';

// Componentes páginas
import { MedicalSpecialtiesCreatePageComponent } from './pages/medical-specialties-create-page/medical-specialties-create-page.component';
import { MedicalSpecialtiesEditPageComponent } from './pages/medical-specialties-edit-page/medical-specialties-edit-page.component';
import { MedicalSpecialtiesPageComponent } from './pages/medical-specialties-page/medical-specialties-page.component';
import { MedicalSpecialtiesViewPageComponent } from './pages/medical-specialties-view-page/medical-specialties-view-page.component';

// Componentes tarjetas
import { ButtonsMedicalSpecialtiesCardComponent } from './components/buttons-medical-specialties-card/buttons-medical-specialties-card.component';
import { CreateMedicalSpecialtiesCardComponent } from './components/create-medical-specialties-card/create-medical-specialties-card.component';
import { EditMedicalSpecialtiesCardComponent } from './components/edit-medical-specialties-card/edit-medical-specialties-card.component';
import { ViewMedicalSpecialtiesCardComponent } from './components/view-medical-specialties-card/view-medical-specialties-card.component';

@NgModule({
  declarations: [
    MedicalSpecialtiesPageComponent,
    MedicalSpecialtiesViewPageComponent,
    ViewMedicalSpecialtiesCardComponent,
    ButtonsMedicalSpecialtiesCardComponent,
    MedicalSpecialtiesEditPageComponent,
    EditMedicalSpecialtiesCardComponent,
    CreateMedicalSpecialtiesCardComponent,
    MedicalSpecialtiesCreatePageComponent,
  ],
  imports: [
    CommonModule,
    MedicalSpecialtiesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    GenericPageModule,
    GenericListCardModule,
    GenericCardModule,
    FormErrorsModule,
  ],
})
export class MedicalSpecialtiesModule {}
