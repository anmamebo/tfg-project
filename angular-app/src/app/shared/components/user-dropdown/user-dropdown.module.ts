import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDropdownComponent } from './user-dropdown.component';

@NgModule({
  declarations: [UserDropdownComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserDropdownComponent],
})
export class UserDropdownModule {}
