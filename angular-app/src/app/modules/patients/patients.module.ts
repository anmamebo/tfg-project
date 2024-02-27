import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from '@app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { GenericTableModule } from '@app/shared/components/generic-table/generic-table.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { SearchModule } from '@app/shared/components/search/search.module';
import { SharedModule } from '@app/shared/shared.module';
import { AppointmentsPatientModule } from '../appointments-patient/appointments-patient.module';
import { MedicalTestsModule } from '../medical-tests/medical-tests.module';
import { TreatmentsPatientModule } from '../treatments-patient/treatments-patient.module';
import { PatientsRoutingModule } from './patients-routing.module';

// Componentes páginas
import { PatientsCreatePageComponent } from './pages/patients-create-page/patients-create-page.component';
import { PatientsEditPageComponent } from './pages/patients-edit-page/patients-edit-page.component';
import { PatientsMedicalHistoryPageComponent } from './pages/patients-medical-history-page/patients-medical-history-page.component';
import { PatientsMedicalTestsPageComponent } from './pages/patients-medical-tests-page/patients-medical-tests-page.component';
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientsTreatmentsPageComponent } from './pages/patients-treatments-page/patients-treatments-page.component';
import { PatientsViewPageComponent } from './pages/patients-view-page/patients-view-page.component';

// Componentes tarjetas
import { ButtonsPatientsCardComponent } from './components/buttons-patients-card/buttons-patients-card.component';
import { CreatePatientsCardComponent } from './components/create-patients-card/create-patients-card.component';
import { EditAddressPatientsCardComponent } from './components/edit-address-patients-card/edit-address-patients-card.component';
import { EditBasicInfoPatientsCardComponent } from './components/edit-basic-info-patients-card/edit-basic-info-patients-card.component';
import { EditContactInfoPatientsCardComponent } from './components/edit-contact-info-patients-card/edit-contact-info-patients-card.component';
import { ViewAddressPatientsCardComponent } from './components/view-address-patients-card/view-address-patients-card.component';
import { ViewBasicInfoPatientsCardComponent } from './components/view-basic-info-patients-card/view-basic-info-patients-card.component';
import { ViewContactInfoPatientsCardComponent } from './components/view-contact-info-patients-card/view-contact-info-patients-card.component';

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
    PatientsMedicalTestsPageComponent,
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
    MedicalTestsModule,
  ],
})
export class PatientsModule {}
