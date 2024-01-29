import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

// Modulos
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, ReactiveFormsModule, TooltipModule],
  exports: [SearchComponent],
})
export class SearchModule {}
