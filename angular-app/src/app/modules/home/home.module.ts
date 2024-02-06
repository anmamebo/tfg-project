import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Módulos de terceros
import { NgApexchartsModule } from 'ng-apexcharts';

// Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Módulos
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

// Componentes Páginas
import { AdministrativeHomePageComponent } from './pages/administrative-home-page/administrative-home-page.component';
import { DoctorHomePageComponent } from './pages/doctor-home-page/doctor-home-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PatientHomePageComponent } from './pages/patient-home-page/patient-home-page.component';

// Componentes
import { AppointmentsAgeColumnChartComponent } from './components/administrative/appointments-age-column-chart/appointments-age-column-chart.component';
import { AppointmentsGenderAreaSplineChartComponent } from './components/administrative/appointments-gender-area-spline-chart/appointments-gender-area-spline-chart.component';
import { AppointmentsStatusPieChartComponent } from './components/administrative/appointments-status-pie-chart/appointments-status-pie-chart.component';
import { AppointmentsTypesStackedColumnChartComponent } from './components/administrative/appointments-types-stacked-column-chart/appointments-types-stacked-column-chart.component';
import { DoctorsMedicalSpecialtiesDonutChartComponent } from './components/administrative/doctors-medical-specialties-donut-chart/doctors-medical-specialties-donut-chart.component';
import { MonthlyAppointmentsLineChartComponent } from './components/administrative/monthly-appointments-line-chart/monthly-appointments-line-chart.component';
import { PatientsTableComponent } from './components/administrative/patients-table/patients-table.component';
import { StatisticsCardsComponent } from './components/administrative/statistics-cards/statistics-cards.component';
import { DoctorAppointmentsAgeColumnsChartComponent } from './components/doctor/doctor-appointments-age-columns-chart/doctor-appointments-age-columns-chart.component';
import { DoctorAppointmentsGenderDonutChartComponent } from './components/doctor/doctor-appointments-gender-donut-chart/doctor-appointments-gender-donut-chart.component';
import { DoctorAppointmentsSpecialtyColumnsChartComponent } from './components/doctor/doctor-appointments-specialty-columns-chart/doctor-appointments-specialty-columns-chart.component';
import { DoctorMonthlyAppointmentsLineChartComponent } from './components/doctor/doctor-monthly-appointments-line-chart/doctor-monthly-appointments-line-chart.component';
import { DoctorStatisticsCardsComponent } from './components/doctor/doctor-statistics-cards/doctor-statistics-cards.component';
import { DoctorTodayAppointmentsCalendarComponent } from './components/doctor/doctor-today-appointments-calendar/doctor-today-appointments-calendar.component';
import { PatientAppointmentsSpecialtiesStackedColumnChartComponent } from './components/patient/patient-appointments-specialties-stacked-column-chart/patient-appointments-specialties-stacked-column-chart.component';
import { PatientStatisticsCardsComponent } from './components/patient/patient-statistics-cards/patient-statistics-cards.component';
import { PatientTodayAppointmentsCalendarComponent } from './components/patient/patient-today-appointments-calendar/patient-today-appointments-calendar.component';
import { AverageWaitingTimeCardComponent } from './components/shared/average-waiting-time-card/average-waiting-time-card.component';
import { WelcomeCardComponent } from './components/shared/welcome-card/welcome-card.component';

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
    PatientHomePageComponent,
    PatientStatisticsCardsComponent,
    PatientTodayAppointmentsCalendarComponent,
    PatientAppointmentsSpecialtiesStackedColumnChartComponent,
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
