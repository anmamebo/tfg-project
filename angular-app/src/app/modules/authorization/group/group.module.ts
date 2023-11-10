import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GroupRoutingModule } from './group-routing.module';
import { GenericTableModule } from "src/app/shared/components/generic-table/generic-table.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";

import { GroupPageComponent } from "./pages/group-page/group-page.component";
import { GroupEditPageComponent } from "./pages/group-edit-page/group-edit-page.component";
import { GroupViewPageComponent } from './pages/group-view-page/group-view-page.component';

import { CreateGroupCardComponent } from "./components/create-group-card/create-group-card.component";
import { ListGroupCardComponent } from "./components/list-group-card/list-group-card.component";
import { EditGroupCardComponent } from "./components/edit-group-card/edit-group-card.component";
import { ViewGroupCardComponent } from './components/view-group-card/view-group-card.component';

@NgModule({
  declarations: [
    GroupPageComponent,
    CreateGroupCardComponent,
    ListGroupCardComponent,
    GroupEditPageComponent,
    EditGroupCardComponent,
    GroupViewPageComponent,
    ViewGroupCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupRoutingModule,
    GenericTableModule,
    PaginationModule,
    GenericPageModule
  ]
})
export class GroupModule { }
