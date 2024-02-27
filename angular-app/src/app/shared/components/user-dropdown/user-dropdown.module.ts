import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvatarModule } from '@app/shared/components/avatar/avatar.module';

import { UserDropdownComponent } from './user-dropdown.component';

@NgModule({
  declarations: [UserDropdownComponent],
  imports: [CommonModule, RouterModule, AvatarModule],
  exports: [UserDropdownComponent],
})
export class UserDropdownModule {}
