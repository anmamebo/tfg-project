import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { SignoutComponent } from './signout/signout.component';

import { AuthGuardService as AuthGuard } from "../core/services/auth-guard.service";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: SignoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
