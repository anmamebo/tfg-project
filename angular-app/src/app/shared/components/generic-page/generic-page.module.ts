import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from "../breadcrumb/breadcrumb.module";

import { GenericPageComponent } from './generic-page.component';


@NgModule({
  declarations: [
    GenericPageComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  exports: [
    GenericPageComponent
  ]
})
export class GenericPageModule { }
