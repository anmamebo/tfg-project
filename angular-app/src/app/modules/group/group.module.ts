import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './group-routing.module';

import { GroupPageComponent } from './pages/group-page/group-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';

@NgModule({
  declarations: [GroupPageComponent, PermissionPageComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class GroupModule {}
