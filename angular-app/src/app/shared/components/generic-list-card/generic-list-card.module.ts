import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Módulos
import { GenericCardModule } from "src/app/shared/components/generic-card/generic-card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { ElementsPerPageModule } from "src/app/shared/components/elements-per-page/elements-per-page.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { LoadingSpinnerModule } from "src/app/shared/components/loading-spinner/loading-spinner.module";

// Componentes
import { GenericListCardComponent } from './generic-list-card.component';


@NgModule({
  declarations: [
    GenericListCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GenericCardModule,
    SearchModule,
    GenericTableModule,
    ElementsPerPageModule,
    PaginationModule,
    LoadingSpinnerModule,
  ],
  exports: [
    GenericListCardComponent
  ]
})
export class GenericListCardModule { }
