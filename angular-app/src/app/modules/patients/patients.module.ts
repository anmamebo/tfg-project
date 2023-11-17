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
import { SharedModule } from "src/app/shared/shared.module";

// Componentes páginas
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientsViewPageComponent } from './pages/patients-view-page/patients-view-page.component';

// Componentes tarjetas
import { ListPatientsCardComponent } from './components/list-patients-card/list-patients-card.component';
import { ViewBasicInfoPatientsCardComponent } from './components/view-basic-info-patients-card/view-basic-info-patients-card.component';
import { ViewContactInfoPatientsCardComponent } from './components/view-contact-info-patients-card/view-contact-info-patients-card.component';
import { ViewAddressPatientsCardComponent } from './components/view-address-patients-card/view-address-patients-card.component';


@NgModule({
  declarations: [
    PatientsPageComponent,
    ListPatientsCardComponent,
    PatientsViewPageComponent,
    ViewBasicInfoPatientsCardComponent,
    ViewContactInfoPatientsCardComponent,
    ViewAddressPatientsCardComponent,
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
    SharedModule,
  ]
})
export class PatientsModule { }
