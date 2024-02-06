import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Componentes
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

@NgModule({
  declarations: [Error404PageComponent],
  imports: [CommonModule, RouterModule],
})
export class ErrorModule {}
