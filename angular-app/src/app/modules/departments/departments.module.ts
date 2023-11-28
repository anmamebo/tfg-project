import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { DepartmentsRoutingModule } from './departments-routing.module';
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { GenericCardModule } from "src/app/shared/components/generic-card/generic-card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { ElementsPerPageModule } from "src/app/shared/components/elements-per-page/elements-per-page.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { GenericListCardModule } from "src/app/shared/components/generic-list-card/generic-list-card.module";
import { FormErrorsModule } from "src/app/shared/components/form-errors/form-errors.module";

// Componentes páginas
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { DepartmentsViewPageComponent } from './pages/departments-view-page/departments-view-page.component';
import { DepartmentsEditPageComponent } from './pages/departments-edit-page/departments-edit-page.component';
import { DepartmentsCreatePageComponent } from './pages/departments-create-page/departments-create-page.component';

// Componentes tarjetas
import { ViewInfoDepartmentsCardComponent } from './components/view-info-departments-card/view-info-departments-card.component';
import { ViewRoomsDepartmentsCardComponent } from './components/view-rooms-departments-card/view-rooms-departments-card.component';
import { ViewDoctorsDepartmentsCardComponent } from './components/view-doctors-departments-card/view-doctors-departments-card.component';
import { EditInfoDepartmentsCardComponent } from './components/edit-info-departments-card/edit-info-departments-card.component';
import { CreateDepartmentsCardComponent } from './components/create-departments-card/create-departments-card.component';


@NgModule({
  declarations: [
    DepartmentsPageComponent,
    DepartmentsViewPageComponent,
    ViewInfoDepartmentsCardComponent,
    ViewRoomsDepartmentsCardComponent,
    ViewDoctorsDepartmentsCardComponent,
    DepartmentsEditPageComponent,
    EditInfoDepartmentsCardComponent,
    DepartmentsCreatePageComponent,
    CreateDepartmentsCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DepartmentsRoutingModule,
    GenericPageModule,
    GenericCardModule,
    SearchModule,
    GenericTableModule,
    ElementsPerPageModule,
    PaginationModule,
    GenericListCardModule,
    FormErrorsModule,
  ]
})
export class DepartmentsModule { }
