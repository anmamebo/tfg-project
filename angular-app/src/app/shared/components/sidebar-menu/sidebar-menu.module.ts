import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { SidebarMenuComponent } from './sidebar-menu.component';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}
