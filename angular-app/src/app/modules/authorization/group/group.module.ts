import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Modulos
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from '@app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { GenericTableModule } from '@app/shared/components/generic-table/generic-table.module';
import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { GroupRoutingModule } from './group-routing.module';

// Componentes páginas
import { GroupEditPageComponent } from './pages/group-edit-page/group-edit-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { GroupViewPageComponent } from './pages/group-view-page/group-view-page.component';

// Componentes tarjetas
import { CreateGroupCardComponent } from './components/create-group-card/create-group-card.component';
import { EditGroupCardComponent } from './components/edit-group-card/edit-group-card.component';
import { ViewGroupCardComponent } from './components/view-group-card/view-group-card.component';

@NgModule({
  declarations: [
    GroupPageComponent,
    CreateGroupCardComponent,
    GroupEditPageComponent,
    EditGroupCardComponent,
    GroupViewPageComponent,
    ViewGroupCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupRoutingModule,
    GenericTableModule,
    PaginationModule,
    GenericPageModule,
    GenericCardModule,
    FormErrorsModule,
    GenericListCardModule,
    LoadingSpinnerModule,
  ],
})
export class GroupModule {}
