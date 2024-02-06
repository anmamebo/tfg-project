import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Módulos
import { SidebarMenuModule } from '../sidebar-menu/sidebar-menu.module';
import { UserDropdownModule } from '../user-dropdown/user-dropdown.module';

// Componentes
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, UserDropdownModule, SidebarMenuModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
