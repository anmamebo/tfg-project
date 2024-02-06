import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { AdministrativesRoutingModule } from './administratives-routing.module';

// Componentes páginas
import { AdministrativesCreatePageComponent } from './pages/administratives-create-page/administratives-create-page.component';
import { AdministrativesEditPageComponent } from './pages/administratives-edit-page/administratives-edit-page.component';
import { AdministrativesPageComponent } from './pages/administratives-page/administratives-page.component';
import { AdministrativesViewPageComponent } from './pages/administratives-view-page/administratives-view-page.component';

// Componentes tarjetas
import { ButtonsAdministrativesCardComponent } from './components/buttons-administratives-card/buttons-administratives-card.component';
import { CreateAdministrativesCardComponent } from './components/create-administratives-card/create-administratives-card.component';
import { EditInfoAdministrativesCardComponent } from './components/edit-info-administratives-card/edit-info-administratives-card.component';
import { ViewInfoAdministrativesCardComponent } from './components/view-info-administratives-card/view-info-administratives-card.component';

@NgModule({
  declarations: [
    AdministrativesPageComponent,
    AdministrativesCreatePageComponent,
    CreateAdministrativesCardComponent,
    AdministrativesViewPageComponent,
    ViewInfoAdministrativesCardComponent,
    ButtonsAdministrativesCardComponent,
    AdministrativesEditPageComponent,
    EditInfoAdministrativesCardComponent,
  ],
  imports: [
    CommonModule,
    AdministrativesRoutingModule,
    ReactiveFormsModule,
    GenericPageModule,
    GenericListCardModule,
    GenericCardModule,
    FormErrorsModule,
  ],
})
export class AdministrativesModule {}
