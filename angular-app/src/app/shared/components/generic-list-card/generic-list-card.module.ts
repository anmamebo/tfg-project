import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Módulos
import { ElementsPerPageModule } from '@app/shared/components/elements-per-page/elements-per-page.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericTableModule } from '@app/shared/components/generic-table/generic-table.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { SearchModule } from '@app/shared/components/search/search.module';
import { SharedModule } from '@app/shared/shared.module';

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
