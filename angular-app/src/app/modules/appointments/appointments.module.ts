import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlatpickrModule } from 'angularx-flatpickr';

// Módulos
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';

// Componentes Páginas
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { AppointmentsViewPageComponent } from './pages/appointments-view-page/appointments-view-page.component';
import { AppointmentsHistoricalViewPageComponent } from './pages/appointments-historical-view-page/appointments-historical-view-page.component';

// Componentes Tarjetas
import { ListAppointmentsDoctorCardComponent } from './components/list-appointments-doctor-card/list-appointments-doctor-card.component';
import { ViewPatientAppointmentsCardComponent } from './components/view-patient-appointments-card/view-patient-appointments-card.component';
import { ViewInfoStatusAppointmentsCardComponent } from './components/view-info-status-appointments-card/view-info-status-appointments-card.component';
import { ViewReasonObservationsAppointmentsCardComponent } from './components/view-reason-observations-appointments-card/view-reason-observations-appointments-card.component';
import { ViewTreatmentsAppointmentsCardComponent } from './components/view-treatments-appointments-card/view-treatments-appointments-card.component';
import { ListAppointmentsHistoricalDoctorCardComponent } from './components/list-appointments-historical-doctor-card/list-appointments-historical-doctor-card.component';

// Componentes
import { TableAppointmentsComponent } from './components/table-appointments/table-appointments.component';
import { AccordionTreatmentsAppointmentsComponent } from './components/accordion-treatments-appointments/accordion-treatments-appointments.component';
import { FormCreateTreatmentAppointmentsComponent } from './components/form-create-treatment-appointments/form-create-treatment-appointments.component';
import { FormEditTreatmentAppointmentsComponent } from './components/form-edit-treatment-appointments/form-edit-treatment-appointments.component';

@NgModule({
  declarations: [
    AppointmentsPageComponent,
    ListAppointmentsDoctorCardComponent,
    TableAppointmentsComponent,
    AppointmentsViewPageComponent,
    ViewPatientAppointmentsCardComponent,
    ViewInfoStatusAppointmentsCardComponent,
    ViewReasonObservationsAppointmentsCardComponent,
    ViewTreatmentsAppointmentsCardComponent,
    AccordionTreatmentsAppointmentsComponent,
    FormCreateTreatmentAppointmentsComponent,
    AppointmentsHistoricalViewPageComponent,
    ListAppointmentsHistoricalDoctorCardComponent,
    FormEditTreatmentAppointmentsComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    GenericTableModule,
    ElementsPerPageModule,
    PaginationModule,
    FormErrorsModule,
    SweetAlert2Module.forRoot(),
    FlatpickrModule.forRoot(),
    SearchModule,
    TooltipModule,
  ],
})
export class AppointmentsModule {}
