import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PermissionRoutingModule } from "./permission-routing.module";
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { BreadcrumbModule } from "src/app/shared/components/breadcrumb/breadcrumb.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";

import { PermissionPageComponent } from "./pages/permission-page/permission-page.component";

import { ListPermissionCardComponent } from './components/list-permission-card/list-permission-card.component';


@NgModule({
  declarations: [
    PermissionPageComponent,
    ListPermissionCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PermissionRoutingModule,
    GenericTableModule,
    BreadcrumbModule,
    PaginationModule,
  ]
})
export class PermissionModule { }
