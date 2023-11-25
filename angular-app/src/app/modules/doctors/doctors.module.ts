import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos
import { DoctorsRoutingModule } from './doctors-routing.module';
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { GenericCardModule } from "src/app/shared/components/generic-card/generic-card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { ElementsPerPageModule } from "src/app/shared/components/elements-per-page/elements-per-page.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { FormErrorsModule } from "src/app/shared/components/form-errors/form-errors.module";
import { GenericListCardModule } from "src/app/shared/components/generic-list-card/generic-list-card.module";

// Módulos de terceros
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

// Componentes páginas
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { DoctorsViewPageComponent } from './pages/doctors-view-page/doctors-view-page.component';
import { DoctorsEditPageComponent } from './pages/doctors-edit-page/doctors-edit-page.component';
import { DoctorsCreatePageComponent } from './pages/doctors-create-page/doctors-create-page.component';

// Componentes tarjetas
import { ViewBasicInfoDoctorsCardComponent } from './components/view-basic-info-doctors-card/view-basic-info-doctors-card.component';
import { ViewContactInfoDoctorsCardComponent } from './components/view-contact-info-doctors-card/view-contact-info-doctors-card.component';
import { EditBasicInfoDoctorsCardComponent } from './components/edit-basic-info-doctors-card/edit-basic-info-doctors-card.component';
import { EditContactInfoDoctorsCardComponent } from './components/edit-contact-info-doctors-card/edit-contact-info-doctors-card.component';
import { CreateDoctorsCardComponent } from './components/create-doctors-card/create-doctors-card.component';
import { ButtonsDoctorsCardComponent } from './components/buttons-doctors-card/buttons-doctors-card.component';


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
  ]
})
export class DoctorsModule { }
