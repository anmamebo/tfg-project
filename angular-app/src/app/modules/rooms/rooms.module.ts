import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { RoomsRoutingModule } from './rooms-routing.module';
import { GenericPageModule } from "src/app/shared/components/generic-page/generic-page.module";
import { GenericListCardModule } from "src/app/shared/components/generic-list-card/generic-list-card.module";

// Componentes páginas
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';



@NgModule({
  declarations: [
    RoomsPageComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    GenericPageModule,
    GenericListCardModule,
  ]
})
export class RoomsModule { }
