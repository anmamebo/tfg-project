import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Módulos
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { GenericListCardComponent } from './generic-list-card.component';

@NgModule({
  declarations: [GenericListCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    GenericCardModule,
    SearchModule,
    GenericTableModule,
    ElementsPerPageModule,
    PaginationModule,
    LoadingSpinnerModule,
  ],
  exports: [GenericListCardComponent],
})
export class GenericListCardModule {}
