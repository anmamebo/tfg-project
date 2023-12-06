import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

// Componentes
import { GenericPageComponent } from './generic-page.component';

@NgModule({
  declarations: [GenericPageComponent],
  imports: [CommonModule, BreadcrumbModule],
  exports: [GenericPageComponent],
})
export class GenericPageModule {}
