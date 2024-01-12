import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomsViewPageComponent } from './pages/rooms-view-page/rooms-view-page.component';
import { RoomsEditPageComponent } from './pages/rooms-edit-page/rooms-edit-page.component';
import { RoomsCreatePageComponent } from './pages/rooms-create-page/rooms-create-page.component';

import { roomResolver } from 'src/app/core/resolvers/room.resolver';

import { roleGuard } from 'src/app/core/guards/role.guard';
import { ROLES } from 'src/app/core/constants/roles.constants';

const routes: Routes = [
  {
    path: '',
    component: RoomsPageComponent,
    title: 'Salas | HospitalSys',
  },
  {
    path: 'crear',
    component: RoomsCreatePageComponent,
    title: 'Crear sala | HospitalSys',
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: ':id',
    component: RoomsViewPageComponent,
    title: 'Ver sala | HospitalSys',
    resolve: {
      data: roomResolver, // Resolver para obtener los datos de la sala
    },
  },
  {
    path: 'editar/:id',
    component: RoomsEditPageComponent,
    title: 'Editar sala | HospitalSys',
    resolve: {
      data: roomResolver, // Resolver para obtener los datos de la sala
    },
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
