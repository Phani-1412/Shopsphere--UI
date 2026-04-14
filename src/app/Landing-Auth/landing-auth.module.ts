import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LandingAuthRoutingModule } from './landing-auth-routing.module';
import { Auth } from './auth/auth';
import { LandingPage } from './landing-page/landing-page';


@NgModule({
  declarations: [
    Auth,
    LandingPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    LandingAuthRoutingModule
  ]
})
export class LandingAuthModule { }