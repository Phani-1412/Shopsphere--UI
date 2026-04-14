import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { LandingPage } from './landing-page/landing-page';

const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'login', component: Auth }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingAuthRoutingModule { }