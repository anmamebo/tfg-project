import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AvatarModule } from 'src/app/shared/components/avatar/avatar.module';

import { UserDropdownComponent } from './user-dropdown.component';

@NgModule({
  declarations: [UserDropdownComponent],
  imports: [CommonModule, RouterModule, AvatarModule],
  exports: [UserDropdownComponent],
})
export class UserDropdownModule {}
