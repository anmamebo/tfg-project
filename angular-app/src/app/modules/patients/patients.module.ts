import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { PatientsRoutingModule } from './patients-routing.module';
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { GenericCardModule } from "src/app/shared/components/generic-card/generic-card.module";
import { LoadingSpinnerModule } from "src/app/shared/components/loading-spinner/loading-spinner.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { ElementsPerPageModule } from "src/app/shared/components/elements-per-page/elements-per-page.module";
import { SearchModule } from "src/app/shared/components/search/search.module";

// Componentes páginas
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';

// Componentes tarjetas
import { ListPatientsCardComponent } from './components/list-patients-card/list-patients-card.component';


@NgModule({
  declarations: [
    PatientsPageComponent,
    ListPatientsCardComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    GenericPageModule,
    GenericCardModule,
    LoadingSpinnerModule,
    GenericTableModule,
    PaginationModule,
    ElementsPerPageModule,
    SearchModule,
  ]
})
export class PatientsModule { }
