import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModulesRoutingModule } from './modules-routing.module';

import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

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
