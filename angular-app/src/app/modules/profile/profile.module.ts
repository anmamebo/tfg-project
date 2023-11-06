import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { BreadcrumbModule } from "src/app/shared/components/breadcrumb/breadcrumb.module";

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AvatarCardComponent } from './components/avatar-card/avatar-card.component';
import { BasicInfoCardComponent } from './components/basic-info-card/basic-info-card.component';
import { ContactInfoCardComponent } from './components/contact-info-card/contact-info-card.component';
import { ChangePasswordCardComponent } from './components/change-password-card/change-password-card.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    AvatarCardComponent,
    BasicInfoCardComponent,
    ContactInfoCardComponent,
    ChangePasswordCardComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    BreadcrumbModule
  ],
})
export class ProfileModule {}
