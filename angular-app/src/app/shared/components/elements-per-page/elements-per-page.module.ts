import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ElementsPerPageComponent } from './elements-per-page.component';

@NgModule({
  declarations: [ElementsPerPageComponent],
  imports: [CommonModule, FormsModule],
  exports: [ElementsPerPageComponent],
})
export class ElementsPerPageModule {}
