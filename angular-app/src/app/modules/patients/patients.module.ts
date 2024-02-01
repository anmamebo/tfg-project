import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { PatientsRoutingModule } from './patients-routing.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';
import { AppointmentsPatientModule } from '../appointments-patient/appointments-patient.module';
import { TreatmentsPatientModule } from '../treatments-patient/treatments-patient.module';

// Componentes páginas
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientsViewPageComponent } from './pages/patients-view-page/patients-view-page.component';
import { PatientsEditPageComponent } from './pages/patients-edit-page/patients-edit-page.component';
import { PatientsCreatePageComponent } from './pages/patients-create-page/patients-create-page.component';
import { PatientsMedicalHistoryPageComponent } from './pages/patients-medical-history-page/patients-medical-history-page.component';
import { PatientsTreatmentsPageComponent } from './pages/patients-treatments-page/patients-treatments-page.component';

// Componentes tarjetas
import { ViewBasicInfoPatientsCardComponent } from './components/view-basic-info-patients-card/view-basic-info-patients-card.component';
import { ViewContactInfoPatientsCardComponent } from './components/view-contact-info-patients-card/view-contact-info-patients-card.component';
import { ViewAddressPatientsCardComponent } from './components/view-address-patients-card/view-address-patients-card.component';
import { EditBasicInfoPatientsCardComponent } from './components/edit-basic-info-patients-card/edit-basic-info-patients-card.component';
import { EditContactInfoPatientsCardComponent } from './components/edit-contact-info-patients-card/edit-contact-info-patients-card.component';
import { EditAddressPatientsCardComponent } from './components/edit-address-patients-card/edit-address-patients-card.component';
import { ButtonsPatientsCardComponent } from './components/buttons-patients-card/buttons-patients-card.component';
import { CreatePatientsCardComponent } from './components/create-patients-card/create-patients-card.component';

@NgModule({
  declarations: [
    PatientsPageComponent,
    PatientsViewPageComponent,
    ViewBasicInfoPatientsCardComponent,
    ViewContactInfoPatientsCardComponent,
    ViewAddressPatientsCardComponent,
    PatientsEditPageComponent,
    EditBasicInfoPatientsCardComponent,
    EditContactInfoPatientsCardComponent,
    EditAddressPatientsCardComponent,
    ButtonsPatientsCardComponent,
    PatientsCreatePageComponent,
    CreatePatientsCardComponent,
    PatientsMedicalHistoryPageComponent,
    PatientsTreatmentsPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    PatientsRoutingModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    GenericTableModule,
    PaginationModule,
    ElementsPerPageModule,
    SearchModule,
    SharedModule,
    FormErrorsModule,
    GenericListCardModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppointmentsPatientModule,
    TreatmentsPatientModule,
  ],
})
export class PatientsModule {}
