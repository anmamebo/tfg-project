import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos de terceros
import { NgApexchartsModule } from 'ng-apexcharts';

// Módulos
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';

// Componentes Páginas
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdministrativeHomePageComponent } from './pages/administrative-home-page/administrative-home-page.component';

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
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgApexchartsModule,
    GenericCardModule,
    GenericListCardModule,
  ],
})
export class HomeModule {}
