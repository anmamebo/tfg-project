import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { AppointmentRequestRoutingModule } from './appointment-request-routing.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';

// Componentes Páginas
import { AppointmentRequestPageComponent } from './pages/appointment-request-page/appointment-request-page.component';

// Componentes Tarjetas
import { CreateAppointmentRequestCardComponent } from './components/create-appointment-request-card/create-appointment-request-card.component';

@NgModule({
  declarations: [
    AppointmentRequestPageComponent,
    CreateAppointmentRequestCardComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRequestRoutingModule,
    ReactiveFormsModule,
    GenericPageModule,
    GenericCardModule,
    FormErrorsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class AppointmentRequestModule {}
