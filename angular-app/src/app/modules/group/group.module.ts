import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './group-routing.module';
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { BreadcrumbModule } from "src/app/shared/components/breadcrumb/breadcrumb.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";

import { GroupPageComponent } from './pages/group-page/group-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';

import { CreateGroupCardComponent } from './components/create-group-card/create-group-card.component';
import { ListGroupCardComponent } from './components/list-group-card/list-group-card.component';

@NgModule({
  declarations: [
    GroupPageComponent,
    PermissionPageComponent,
    CreateGroupCardComponent,
    ListGroupCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule, 
    GenericTableModule,
    BreadcrumbModule,
    PaginationModule,
  ],
})
export class GroupModule {}
