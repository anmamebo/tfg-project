import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { SharedModule } from '@app/shared/shared.module';
import { TreatmentsPatientRoutingModule } from './treatments-patient-routing.module';

// Componentes Páginas
import { TreatmentsHistoricalPatientPageComponent } from './pages/treatments-historical-patient-page/treatments-historical-patient-page.component';
import { TreatmentsPatientPageComponent } from './pages/treatments-patient-page/treatments-patient-page.component';

// Componentes Tarjetas
import { FiltersTreatmentsPatientCardComponent } from './components/filters-treatments-patient-card/filters-treatments-patient-card.component';
import { ListTreatmentsHistoricalPatientCardComponent } from './components/list-treatments-historical-patient-card/list-treatments-historical-patient-card.component';
import { ListTreatmentsPatientCardComponent } from './components/list-treatments-patient-card/list-treatments-patient-card.component';
import { ViewTreatmentsPatientCardComponent } from './components/view-treatments-patient-card/view-treatments-patient-card.component';

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
    TooltipModule,
  ],
  exports: [
    ListTreatmentsPatientCardComponent,
    ListTreatmentsHistoricalPatientCardComponent,
  ],
})
export class TreatmentsPatientModule {}
