import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { SharedModule } from '@app/shared/shared.module';
import { AppointmentsPatientRoutingModule } from './appointments-patient-routing.module';

// Componentes Páginas
import { AppointmentsCalendarPatientPageComponent } from './pages/appointments-calendar-patient-page/appointments-calendar-patient-page.component';
import { AppointmentsHistoricalPatientPageComponent } from './pages/appointments-historical-patient-page/appointments-historical-patient-page.component';
import { AppointmentsPatientPageComponent } from './pages/appointments-patient-page/appointments-patient-page.component';

// Componentes Tarjetas
import { FiltersAppointmentsPatientCardComponent } from './components/filters-appointments-patient-card/filters-appointments-patient-card.component';
import { ListAppointmentsHistoricalPatientCardComponent } from './components/list-appointments-historical-patient-card/list-appointments-historical-patient-card.component';
import { ListAppointmentsPatientCardComponent } from './components/list-appointments-patient-card/list-appointments-patient-card.component';
import { ViewAppointmentsPatientCardComponent } from './components/view-appointments-patient-card/view-appointments-patient-card.component';

@NgModule({
  declarations: [
    AppointmentsPatientPageComponent,
    ListAppointmentsPatientCardComponent,
    ViewAppointmentsPatientCardComponent,
    AppointmentsHistoricalPatientPageComponent,
    ListAppointmentsHistoricalPatientCardComponent,
    AppointmentsCalendarPatientPageComponent,
    FiltersAppointmentsPatientCardComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsPatientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    PaginationModule,
    ElementsPerPageModule,
    NgMultiSelectDropDownModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TooltipModule,
  ],
  exports: [
    ListAppointmentsPatientCardComponent,
    ListAppointmentsHistoricalPatientCardComponent,
  ],
})
export class AppointmentsPatientModule {}
