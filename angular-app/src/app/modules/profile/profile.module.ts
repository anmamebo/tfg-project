import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { BreadcrumbModule } from "src/app/shared/components/breadcrumb/breadcrumb.module";
import { LoadingSpinnerModule } from "src/app/shared/components/loading-spinner/loading-spinner.module";

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlatpickrModule } from "angularx-flatpickr";

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AvatarCardComponent } from './components/avatar-card/avatar-card.component';
import { BasicInfoCardComponent } from './components/basic-info-card/basic-info-card.component';
import { ChangePasswordCardComponent } from './components/change-password-card/change-password-card.component';
import { PatientInfoCardComponent } from './components/patient-info-card/patient-info-card.component';
import { AddressInfoCardComponent } from './components/address-info-card/address-info-card.component';
import { DoctorInfoCardComponent } from './components/doctor-info-card/doctor-info-card.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    AvatarCardComponent,
    BasicInfoCardComponent,
    ChangePasswordCardComponent,
    PatientInfoCardComponent,
    AddressInfoCardComponent,
    DoctorInfoCardComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    FlatpickrModule.forRoot(),
    BreadcrumbModule,
    LoadingSpinnerModule
  ],
})
export class ProfileModule {}
