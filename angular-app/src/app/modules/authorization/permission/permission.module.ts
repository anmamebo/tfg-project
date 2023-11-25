import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { PermissionRoutingModule } from "./permission-routing.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { GenericCardModule } from "src/app/shared/components/generic-card/generic-card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";
import { ElementsPerPageModule } from "src/app/shared/components/elements-per-page/elements-per-page.module";
import { GenericListCardModule } from "src/app/shared/components/generic-list-card/generic-list-card.module";

// Componentes páginas
import { PermissionPageComponent } from "./pages/permission-page/permission-page.component";

// Componentes tarjetas



@NgModule({
  declarations: [
    PermissionPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PermissionRoutingModule,
    GenericTableModule,
    PaginationModule,
    GenericPageModule,
    GenericCardModule,
    SearchModule,
    ElementsPerPageModule,
    GenericListCardModule,
  ]
})
export class PermissionModule { }
