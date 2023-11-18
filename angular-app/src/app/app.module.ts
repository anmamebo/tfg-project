import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgProgressModule, NG_PROGRESS_CONFIG, NgProgressComponent } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorHandlerInterceptor } from "src/app/core/interceptors/error-handler.interceptor";

// Locale ES
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
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
    BrowserAnimationsModule
  ],
  providers: [
    importProvidersFrom(NgProgressHttpModule),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: NG_PROGRESS_CONFIG,
      useValue: {
        spinner: false,
        color: '#FF0000',
        speed: 250,
      }
    },
    {
      provide: LOCALE_ID,
      useValue: "es"
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
