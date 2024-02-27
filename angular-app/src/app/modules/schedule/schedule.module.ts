import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Flatpickr (Selector de fechas)
import { FlatpickrModule } from 'angularx-flatpickr';

// Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Módulos
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { ScheduleRoutingModule } from './schedule-routing.module';

// Componentes páginas
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';

@NgModule({
  declarations: [SchedulePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ScheduleRoutingModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    LoadingSpinnerModule,
    GenericPageModule,
  ],
  providers: [],
})
export class ScheduleModule {}
