import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LogisticsGuard } from './guards/logistics.gaurd';
import { Auth } from './Landing-Auth/auth/auth';
import { CustomerGuard } from './customer/customer.guard';
import { SellerGuard } from '../app/guards/seller.guard';
 
const routes: Routes = [
  {
    path: 'landingpage',
    loadChildren: () => import('./Landing-Auth/landing-auth.module').then(m => m.LandingAuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logistics',
    loadChildren: () => import('./logistics/logistics.module').then(m => m.LogisticsModule),
    canActivate: [LogisticsGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [CustomerGuard]
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
    canActivate: [SellerGuard]
  },
  {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'landingpage'
  }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 

