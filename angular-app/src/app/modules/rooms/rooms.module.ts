import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { FormErrorsModule } from '@app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from '@app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from '@app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from '@app/shared/components/generic-page/generic-page.module';
import { SharedModule } from '@app/shared/shared.module';
import { RoomsRoutingModule } from './rooms-routing.module';

// Módulos de terceros
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Componentes páginas
import { RoomsCreatePageComponent } from './pages/rooms-create-page/rooms-create-page.component';
import { RoomsEditPageComponent } from './pages/rooms-edit-page/rooms-edit-page.component';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomsViewPageComponent } from './pages/rooms-view-page/rooms-view-page.component';

// Componentes tarjetas
import { ButtonsRoomsCardComponent } from './components/buttons-rooms-card/buttons-rooms-card.component';
import { CreateRoomsCardComponent } from './components/create-rooms-card/create-rooms-card.component';
import { EditInfoRoomsCardComponent } from './components/edit-info-rooms-card/edit-info-rooms-card.component';
import { ViewInfoRoomsCardComponent } from './components/view-info-rooms-card/view-info-rooms-card.component';

@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomsViewPageComponent,
    ViewInfoRoomsCardComponent,
    ButtonsRoomsCardComponent,
    RoomsEditPageComponent,
    EditInfoRoomsCardComponent,
    RoomsCreatePageComponent,
    CreateRoomsCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoomsRoutingModule,
    SharedModule,
    GenericPageModule,
    GenericListCardModule,
    GenericCardModule,
    FormErrorsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class RoomsModule {}
