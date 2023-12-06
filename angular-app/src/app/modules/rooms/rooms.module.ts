import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { RoomsRoutingModule } from './rooms-routing.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';

// Módulos de terceros
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Componentes páginas
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomsViewPageComponent } from './pages/rooms-view-page/rooms-view-page.component';
import { RoomsEditPageComponent } from './pages/rooms-edit-page/rooms-edit-page.component';
import { RoomsCreatePageComponent } from './pages/rooms-create-page/rooms-create-page.component';

// Componentes tarjetas
import { ViewInfoRoomsCardComponent } from './components/view-info-rooms-card/view-info-rooms-card.component';
import { ButtonsRoomsCardComponent } from './components/buttons-rooms-card/buttons-rooms-card.component';
import { EditInfoRoomsCardComponent } from './components/edit-info-rooms-card/edit-info-rooms-card.component';
import { CreateRoomsCardComponent } from './components/create-rooms-card/create-rooms-card.component';

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
    GenericPageModule,
    GenericListCardModule,
    GenericCardModule,
    FormErrorsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class RoomsModule {}
