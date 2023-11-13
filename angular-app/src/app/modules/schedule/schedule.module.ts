import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

// Flatpickr (Selector de fechas)
import { FlatpickrModule } from 'angularx-flatpickr';

// Calendario
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns"; 

// Locale ES
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
registerLocaleData(localeEs);

// Módulos
import { ScheduleRoutingModule } from './schedule-routing.module';
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { LoadingSpinnerModule } from "src/app/shared/components/loading-spinner/loading-spinner.module";

// Componentes
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';


@NgModule({
  declarations: [
    SchedulePageComponent
  ],
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
    GenericPageModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "es"
    }
  ]
})
export class ScheduleModule { }
