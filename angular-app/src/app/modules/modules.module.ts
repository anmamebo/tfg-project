import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Módulos
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { ModulesRoutingModule } from './modules-routing.module';

// Componentes
import { ModulesComponent } from './modules.component';

@NgModule({
  declarations: [ModulesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModulesRoutingModule,
    SidebarModule,
    FooterModule,
  ],
})
export class ModulesModule {}
