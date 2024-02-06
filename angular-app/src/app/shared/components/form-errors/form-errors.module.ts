import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormErrorsComponent } from './form-errors.component';

@NgModule({
  declarations: [FormErrorsComponent],
  imports: [CommonModule],
  exports: [FormErrorsComponent],
})
export class FormErrorsModule {}
