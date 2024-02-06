import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ElementsPerPageComponent } from './elements-per-page.component';

@NgModule({
  declarations: [ElementsPerPageComponent],
  imports: [CommonModule, FormsModule],
  exports: [ElementsPerPageComponent],
})
export class ElementsPerPageModule {}
