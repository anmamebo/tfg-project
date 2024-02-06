import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Módulos
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { GenericTableComponent } from './generic-table.component';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [GenericTableComponent],
})
export class GenericTableModule {}
