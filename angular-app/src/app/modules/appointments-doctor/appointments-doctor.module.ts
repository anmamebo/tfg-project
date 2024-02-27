import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlatpickrModule } from 'angularx-flatpickr';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { GenericTableModule } from '@app/shared/components/generic-table/generic-table.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { SearchModule } from '@app/shared/components/search/search.module';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { SharedModule } from '@app/shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-doctor-routing.module';

// Componentes Páginas
import { AppointmentsDoctorPageComponent } from './pages/appointments-doctor-page/appointments-doctor-page.component';
import { AppointmentsHistoricalDoctorPageComponent } from './pages/appointments-historical-doctor-page/appointments-historical-doctor-page.component';
import { AppointmentsViewDoctorPageComponent } from './pages/appointments-view-doctor-page/appointments-view-doctor-page.component';

// Componentes Tarjetas
import { ListAppointmentsDoctorCardComponent } from './components/list-appointments-doctor-card/list-appointments-doctor-card.component';
import { ListAppointmentsHistoricalDoctorCardComponent } from './components/list-appointments-historical-doctor-card/list-appointments-historical-doctor-card.component';
import { ViewInfoStatusAppointmentsDoctorCardComponent } from './components/view-info-status-appointments-doctor-card/view-info-status-appointments-doctor-card.component';
import { ViewMedicalTestsAppointmentsDoctorCardComponent } from './components/view-medical-tests-appointments-doctor-card/view-medical-tests-appointments-doctor-card.component';
import { ViewPatientAppointmentsDoctorCardComponent } from './components/view-patient-appointments-doctor-card/view-patient-appointments-doctor-card.component';
import { ViewReasonObservationsAppointmentsDoctorCardComponent } from './components/view-reason-observations-appointments-doctor-card/view-reason-observations-appointments-doctor-card.component';
import { ViewTreatmentsAppointmentsDoctorCardComponent } from './components/view-treatments-appointments-doctor-card/view-treatments-appointments-doctor-card.component';

// Componentes
import { AccordionTreatmentsAppointmentsComponent } from './components/accordion-treatments-appointments/accordion-treatments-appointments.component';
import { FormCreateMedicalTestAppointmentsComponent } from './components/form-create-medical-test-appointments/form-create-medical-test-appointments.component';
import { FormCreateTreatmentAppointmentsComponent } from './components/form-create-treatment-appointments/form-create-treatment-appointments.component';
import { FormEditTreatmentAppointmentsComponent } from './components/form-edit-treatment-appointments/form-edit-treatment-appointments.component';
import { TableAppointmentsDoctorComponent } from './components/table-appointments-doctor/table-appointments-doctor.component';
import { TableMedicalTestsAppointmentsDoctorComponent } from './components/table-medical-tests-appointments-doctor/table-medical-tests-appointments-doctor.component';

@NgModule({
  declarations: [
    AppointmentsDoctorPageComponent,
    ListAppointmentsDoctorCardComponent,
    TableAppointmentsDoctorComponent,
    AppointmentsViewDoctorPageComponent,
    ViewPatientAppointmentsDoctorCardComponent,
    ViewInfoStatusAppointmentsDoctorCardComponent,
    ViewReasonObservationsAppointmentsDoctorCardComponent,
    ViewTreatmentsAppointmentsDoctorCardComponent,
    AccordionTreatmentsAppointmentsComponent,
    FormCreateTreatmentAppointmentsComponent,
    AppointmentsHistoricalDoctorPageComponent,
    ListAppointmentsHistoricalDoctorCardComponent,
    FormEditTreatmentAppointmentsComponent,
    ViewMedicalTestsAppointmentsDoctorCardComponent,
    FormCreateMedicalTestAppointmentsComponent,
    TableMedicalTestsAppointmentsDoctorComponent,
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
export class AppointmentsDoctorModule {}
