import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Módulos
import { AppointmentsPatientRoutingModule } from './appointments-patient-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';

// Componentes Páginas
import { AppointmentsPatientPageComponent } from './pages/appointments-patient-page/appointments-patient-page.component';
import { AppointmentsHistoricalPatientPageComponent } from './pages/appointments-historical-patient-page/appointments-historical-patient-page.component';
import { AppointmentsCalendarPatientPageComponent } from './pages/appointments-calendar-patient-page/appointments-calendar-patient-page.component';

// Componentes Tarjetas
import { ListAppointmentsPatientCardComponent } from './components/list-appointments-patient-card/list-appointments-patient-card.component';
import { ViewAppointmentsPatientCardComponent } from './components/view-appointments-patient-card/view-appointments-patient-card.component';
import { ListAppointmentsHistoricalPatientCardComponent } from './components/list-appointments-historical-patient-card/list-appointments-historical-patient-card.component';
import { FiltersAppointmentsPatientCardComponent } from './components/filters-appointments-patient-card/filters-appointments-patient-card.component';

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
})
export class AppointmentsPatientModule {}
