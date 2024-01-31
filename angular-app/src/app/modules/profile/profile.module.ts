import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { AvatarModule } from 'src/app/shared/components/avatar/avatar.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';

// Componentes páginas
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// Componentes tarjetas
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
    SharedModule,
    LoadingSpinnerModule,
    GenericPageModule,
    GenericCardModule,
    FormErrorsModule,
    AvatarModule,
    NgMultiSelectDropDownModule.forRoot(),
    TooltipModule,
  ],
})
export class ProfileModule {}
