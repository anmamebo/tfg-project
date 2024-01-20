import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { TreatmentsPatientRoutingModule } from './treatments-patient-routing.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes Páginas
import { TreatmentsPatientPageComponent } from './pages/treatments-patient-page/treatments-patient-page.component';
import { TreatmentsHistoricalPatientPageComponent } from './pages/treatments-historical-patient-page/treatments-historical-patient-page.component';

// Componentes Tarjetas
import { ListTreatmentsPatientCardComponent } from './components/list-treatments-patient-card/list-treatments-patient-card.component';
import { ViewTreatmentsPatientCardComponent } from './components/view-treatments-patient-card/view-treatments-patient-card.component';
import { ListTreatmentsHistoricalPatientCardComponent } from './components/list-treatments-historical-patient-card/list-treatments-historical-patient-card.component';
import { FiltersTreatmentsPatientCardComponent } from './components/filters-treatments-patient-card/filters-treatments-patient-card.component';

@NgModule({
  declarations: [
    TreatmentsPatientPageComponent,
    ListTreatmentsPatientCardComponent,
    ViewTreatmentsPatientCardComponent,
    TreatmentsHistoricalPatientPageComponent,
    ListTreatmentsHistoricalPatientCardComponent,
    FiltersTreatmentsPatientCardComponent,
  ],
  imports: [
    CommonModule,
    TreatmentsPatientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    ElementsPerPageModule,
    PaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    FlatpickrModule.forRoot(),
  ],
})
export class TreatmentsPatientModule {}
