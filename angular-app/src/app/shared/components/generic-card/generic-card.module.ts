import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from './generic-card.component';



@NgModule({
  declarations: [
    GenericCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericCardComponent
  ]
})
export class GenericCardModule { }
