import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos de terceros
import { NgApexchartsModule } from 'ng-apexcharts';

// Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Módulos
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';

// Componentes Páginas
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdministrativeHomePageComponent } from './pages/administrative-home-page/administrative-home-page.component';
import { DoctorHomePageComponent } from './pages/doctor-home-page/doctor-home-page.component';

// Componentes
import { MonthlyAppointmentsLineChartComponent } from './components/administrative/monthly-appointments-line-chart/monthly-appointments-line-chart.component';
import { AppointmentsStatusPieChartComponent } from './components/administrative/appointments-status-pie-chart/appointments-status-pie-chart.component';
import { AppointmentsTypesStackedColumnChartComponent } from './components/administrative/appointments-types-stacked-column-chart/appointments-types-stacked-column-chart.component';
import { AppointmentsGenderAreaSplineChartComponent } from './components/administrative/appointments-gender-area-spline-chart/appointments-gender-area-spline-chart.component';
import { DoctorsMedicalSpecialtiesDonutChartComponent } from './components/administrative/doctors-medical-specialties-donut-chart/doctors-medical-specialties-donut-chart.component';
import { PatientsTableComponent } from './components/administrative/patients-table/patients-table.component';
import { StatisticsCardsComponent } from './components/administrative/statistics-cards/statistics-cards.component';
import { WelcomeCardComponent } from './components/shared/welcome-card/welcome-card.component';
import { AverageWaitingTimeCardComponent } from './components/shared/average-waiting-time-card/average-waiting-time-card.component';
import { DoctorStatisticsCardsComponent } from './components/doctor/doctor-statistics-cards/doctor-statistics-cards.component';
import { DoctorMonthlyAppointmentsLineChartComponent } from './components/doctor/doctor-monthly-appointments-line-chart/doctor-monthly-appointments-line-chart.component';
import { DoctorTodayAppointmentsCalendarComponent } from './components/doctor/doctor-today-appointments-calendar/doctor-today-appointments-calendar.component';
import { DoctorAppointmentsGenderDonutChartComponent } from './components/doctor/doctor-appointments-gender-donut-chart/doctor-appointments-gender-donut-chart.component';
import { DoctorAppointmentsSpecialtyColumnsChartComponent } from './components/doctor/doctor-appointments-specialty-columns-chart/doctor-appointments-specialty-columns-chart.component';
import { DoctorAppointmentsAgeColumnsChartComponent } from './components/doctor/doctor-appointments-age-columns-chart/doctor-appointments-age-columns-chart.component';
import { AppointmentsAgeColumnChartComponent } from './components/administrative/appointments-age-column-chart/appointments-age-column-chart.component';

@NgModule({
  declarations: [
    HomePageComponent,
    AdministrativeHomePageComponent,
    MonthlyAppointmentsLineChartComponent,
    AppointmentsStatusPieChartComponent,
    AppointmentsTypesStackedColumnChartComponent,
    AppointmentsGenderAreaSplineChartComponent,
    DoctorsMedicalSpecialtiesDonutChartComponent,
    PatientsTableComponent,
    StatisticsCardsComponent,
    WelcomeCardComponent,
    AverageWaitingTimeCardComponent,
    DoctorHomePageComponent,
    DoctorStatisticsCardsComponent,
    DoctorMonthlyAppointmentsLineChartComponent,
    DoctorTodayAppointmentsCalendarComponent,
    DoctorAppointmentsGenderDonutChartComponent,
    DoctorAppointmentsSpecialtyColumnsChartComponent,
    DoctorAppointmentsAgeColumnsChartComponent,
    AppointmentsAgeColumnChartComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgApexchartsModule,
    GenericCardModule,
    GenericListCardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class HomeModule {}
