import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from '@app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { GenericTableModule } from '@app/shared/components/generic-table/generic-table.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { SearchModule } from '@app/shared/components/search/search.module';
import { SharedModule } from '@app/shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';

// Componentes páginas
import { DepartmentsCreatePageComponent } from './pages/departments-create-page/departments-create-page.component';
import { DepartmentsEditPageComponent } from './pages/departments-edit-page/departments-edit-page.component';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { DepartmentsViewPageComponent } from './pages/departments-view-page/departments-view-page.component';

// Componentes tarjetas
import { ButtonsDepartmentsCardComponent } from './components/buttons-departments-card/buttons-departments-card.component';
import { CreateDepartmentsCardComponent } from './components/create-departments-card/create-departments-card.component';
import { EditInfoDepartmentsCardComponent } from './components/edit-info-departments-card/edit-info-departments-card.component';
import { ViewDoctorsDepartmentsCardComponent } from './components/view-doctors-departments-card/view-doctors-departments-card.component';
import { ViewInfoDepartmentsCardComponent } from './components/view-info-departments-card/view-info-departments-card.component';
import { ViewRoomsDepartmentsCardComponent } from './components/view-rooms-departments-card/view-rooms-departments-card.component';
import { ViewSpecialtiesDepartmentsCardComponent } from './components/view-specialties-departments-card/view-specialties-departments-card.component';

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
    ViewSpecialtiesDepartmentsCardComponent,
    ButtonsDepartmentsCardComponent,
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
    SharedModule,
  ],
})
export class DepartmentsModule {}
