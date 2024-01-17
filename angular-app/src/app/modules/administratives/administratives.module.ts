import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { AdministrativesRoutingModule } from './administratives-routing.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericListCardModule } from 'src/app/shared/components/generic-list-card/generic-list-card.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';

// Componentes páginas
import { AdministrativesPageComponent } from './pages/administratives-page/administratives-page.component';
import { AdministrativesCreatePageComponent } from './pages/administratives-create-page/administratives-create-page.component';
import { AdministrativesViewPageComponent } from './pages/administratives-view-page/administratives-view-page.component';
import { AdministrativesEditPageComponent } from './pages/administratives-edit-page/administratives-edit-page.component';

// Componentes tarjetas
import { CreateAdministrativesCardComponent } from './components/create-administratives-card/create-administratives-card.component';
import { ViewInfoAdministrativesCardComponent } from './components/view-info-administratives-card/view-info-administratives-card.component';
import { ButtonsAdministrativesCardComponent } from './components/buttons-administratives-card/buttons-administratives-card.component';
import { EditInfoAdministrativesCardComponent } from './components/edit-info-administratives-card/edit-info-administratives-card.component';

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
