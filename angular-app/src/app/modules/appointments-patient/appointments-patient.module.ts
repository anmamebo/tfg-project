import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { AppointmentsPatientRoutingModule } from './appointments-patient-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';

// Componentes Páginas
import { AppointmentsPatientPageComponent } from './pages/appointments-patient-page/appointments-patient-page.component';
import { AppointmentsHistoricalPatientPageComponent } from './pages/appointments-historical-patient-page/appointments-historical-patient-page.component';

// Componentes Tarjetas
import { ListAppointmentsPatientCardComponent } from './components/list-appointments-patient-card/list-appointments-patient-card.component';
import { ViewAppointmentsPatientCardComponent } from './components/view-appointments-patient-card/view-appointments-patient-card.component';
import { ListAppointmentsHistoricalPatientCardComponent } from './components/list-appointments-historical-patient-card/list-appointments-historical-patient-card.component';

@NgModule({
  declarations: [
    AppointmentsPatientPageComponent,
    ListAppointmentsPatientCardComponent,
    ViewAppointmentsPatientCardComponent,
    AppointmentsHistoricalPatientPageComponent,
    ListAppointmentsHistoricalPatientCardComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsPatientRoutingModule,
    SharedModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    PaginationModule,
    ElementsPerPageModule,
  ],
})
export class AppointmentsPatientModule {}
