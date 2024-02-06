import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GenericCardComponent } from './generic-card.component';

@NgModule({
  declarations: [GenericCardComponent],
  imports: [CommonModule],
  exports: [GenericCardComponent],
})
export class GenericCardModule {}
