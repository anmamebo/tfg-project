import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { DepartmentsRoutingModule } from './departments-routing.module';
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { GenericCardModule } from "src/app/shared/components/generic-card/generic-card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { ElementsPerPageModule } from "src/app/shared/components/elements-per-page/elements-per-page.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { GenericListCardModule } from "src/app/shared/components/generic-list-card/generic-list-card.module";

// Componentes páginas
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { DepartmentsViewPageComponent } from './pages/departments-view-page/departments-view-page.component';

// Componentes tarjetas
import { ViewInfoDepartmentsCardComponent } from './components/view-info-departments-card/view-info-departments-card.component';
import { ViewRoomsDepartmentsCardComponent } from './components/view-rooms-departments-card/view-rooms-departments-card.component';
import { ViewDoctorsDepartmentsCardComponent } from './components/view-doctors-departments-card/view-doctors-departments-card.component';


@NgModule({
  declarations: [
    DepartmentsPageComponent,
    DepartmentsViewPageComponent,
    ViewInfoDepartmentsCardComponent,
    ViewRoomsDepartmentsCardComponent,
    ViewDoctorsDepartmentsCardComponent,
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    GenericPageModule,
    GenericCardModule,
    SearchModule,
    GenericTableModule,
    ElementsPerPageModule,
    PaginationModule,
    GenericListCardModule,
  ]
})
export class DepartmentsModule { }
