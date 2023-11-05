import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDropdownModule } from '../user-dropdown/user-dropdown.module';

import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, UserDropdownModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
