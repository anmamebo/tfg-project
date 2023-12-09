import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

// Componentes Tarjetas
import { ListTreatmentsPatientCardComponent } from './components/list-treatments-patient-card/list-treatments-patient-card.component';
import { ViewTreatmentsPatientCardComponent } from './components/view-treatments-patient-card/view-treatments-patient-card.component';

@NgModule({
  declarations: [
    TreatmentsPatientPageComponent,
    ListTreatmentsPatientCardComponent,
    ViewTreatmentsPatientCardComponent,
  ],
  imports: [
    CommonModule,
    TreatmentsPatientRoutingModule,
    SharedModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    ElementsPerPageModule,
    PaginationModule,
  ],
})
export class TreatmentsPatientModule {}
