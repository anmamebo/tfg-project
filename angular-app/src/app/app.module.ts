import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {
  NG_PROGRESS_CONFIG,
  NgProgressComponent,
  NgProgressModule,
} from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorHandlerInterceptor } from 'src/app/core/interceptors/error-handler.interceptor';

// Locale ES
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SweetAlert2Module.forRoot(),
    NgProgressModule,
    NgProgressComponent,
    BrowserAnimationsModule,
  ],
  providers: [
    importProvidersFrom(NgProgressHttpModule),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: NG_PROGRESS_CONFIG,
      useValue: {
        spinner: false,
        color: '#435ebe',
        speed: 250,
      },
    },
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
