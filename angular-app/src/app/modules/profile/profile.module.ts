import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { AvatarModule } from '@app/shared/components/avatar/avatar.module';
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { SharedModule } from '@app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

// Componentes páginas
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// Componentes tarjetas
import { AddressInfoCardComponent } from './components/address-info-card/address-info-card.component';
import { AvatarCardComponent } from './components/avatar-card/avatar-card.component';
import { BasicInfoCardComponent } from './components/basic-info-card/basic-info-card.component';
import { ChangePasswordCardComponent } from './components/change-password-card/change-password-card.component';
import { DoctorInfoCardComponent } from './components/doctor-info-card/doctor-info-card.component';
import { PatientInfoCardComponent } from './components/patient-info-card/patient-info-card.component';

// Componentes
import { FormCreateAddressComponent } from './components/form-create-address/form-create-address.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    AvatarCardComponent,
    BasicInfoCardComponent,
    ChangePasswordCardComponent,
    PatientInfoCardComponent,
    AddressInfoCardComponent,
    DoctorInfoCardComponent,
    FormCreateAddressComponent,
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
