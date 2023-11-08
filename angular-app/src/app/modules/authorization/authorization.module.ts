import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { BreadcrumbModule } from "src/app/shared/components/breadcrumb/breadcrumb.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";

import { GroupPageComponent } from './pages/groups/group-page/group-page.component';
import { GroupEditPageComponent } from './pages/groups/group-edit-page/group-edit-page.component';
import { PermissionPageComponent } from './pages/permissions/permission-page/permission-page.component';

import { CreateGroupCardComponent } from './components/groups/create-group-card/create-group-card.component';
import { ListGroupCardComponent } from './components/groups/list-group-card/list-group-card.component';
import { EditGroupCardComponent } from './components/groups/edit-group-card/edit-group-card.component';

@NgModule({
  declarations: [
    GroupPageComponent,
    PermissionPageComponent,
    CreateGroupCardComponent,
    ListGroupCardComponent,
    GroupEditPageComponent,
    EditGroupCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorizationRoutingModule, 
    GenericTableModule,
    BreadcrumbModule,
    PaginationModule,
  ],
})
export class AuthorizationModule {}
