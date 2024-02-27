import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from '@app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { GenericTableModule } from '@app/shared/components/generic-table/generic-table.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { SearchModule } from '@app/shared/components/search/search.module';
import { DoctorsRoutingModule } from './doctors-routing.module';

// Módulos de terceros
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Componentes páginas
import { DoctorsCreatePageComponent } from './pages/doctors-create-page/doctors-create-page.component';
import { DoctorsEditPageComponent } from './pages/doctors-edit-page/doctors-edit-page.component';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { DoctorsSchedulesPageComponent } from './pages/doctors-schedules-page/doctors-schedules-page.component';
import { DoctorsViewPageComponent } from './pages/doctors-view-page/doctors-view-page.component';

// Componentes tarjetas
import { ButtonsDoctorsCardComponent } from './components/buttons-doctors-card/buttons-doctors-card.component';
import { CreateDoctorsCardComponent } from './components/create-doctors-card/create-doctors-card.component';
import { EditBasicInfoDoctorsCardComponent } from './components/edit-basic-info-doctors-card/edit-basic-info-doctors-card.component';
import { EditContactInfoDoctorsCardComponent } from './components/edit-contact-info-doctors-card/edit-contact-info-doctors-card.component';
import { ViewBasicInfoDoctorsCardComponent } from './components/view-basic-info-doctors-card/view-basic-info-doctors-card.component';
import { ViewContactInfoDoctorsCardComponent } from './components/view-contact-info-doctors-card/view-contact-info-doctors-card.component';

@NgModule({
  declarations: [
    DoctorsPageComponent,
    DoctorsViewPageComponent,
    ViewBasicInfoDoctorsCardComponent,
    ViewContactInfoDoctorsCardComponent,
    DoctorsEditPageComponent,
    EditBasicInfoDoctorsCardComponent,
    EditContactInfoDoctorsCardComponent,
    DoctorsCreatePageComponent,
    CreateDoctorsCardComponent,
    ButtonsDoctorsCardComponent,
    DoctorsSchedulesPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorsRoutingModule,
    GenericPageModule,
    GenericCardModule,
    SearchModule,
    GenericTableModule,
    ElementsPerPageModule,
    PaginationModule,
    FormErrorsModule,
    NgMultiSelectDropDownModule.forRoot(),
    GenericListCardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SweetAlert2Module.forRoot(),
  ],
})
export class DoctorsModule {}
