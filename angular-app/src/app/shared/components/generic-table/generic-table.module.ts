import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GenericTableComponent } from './generic-table.component';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [CommonModule, RouterModule],
  exports: [GenericTableComponent],
})
export class GenericTableModule {}
