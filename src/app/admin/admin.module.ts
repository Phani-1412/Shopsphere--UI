import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { AdminRoutingModule } from './admin-routing.module';
import { CardByKeyPipe } from './card-by-key.pipe';
 
import { SellersComponent } from './sellers/sellers.component';
import { OrdersComponent } from './orders/orders.component';
import { DisputesComponent } from './disputes/disputes.component';
import { ReturnsComponent } from './returns/returns.component';
import { CategoriesComponent } from './categories/categories.component';
import { PoliciesComponent } from './policies/policies.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CommissionComponent } from './commission/commission.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
 
@NgModule({
  declarations: [
    AnalyticsComponent,
    SellersComponent,
    OrdersComponent,
    DisputesComponent,
    ReturnsComponent,
    CategoriesComponent,
    PoliciesComponent,
    
    CommissionComponent,
    AdminDashboardComponent,
  
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardByKeyPipe,
    AdminRoutingModule
  ],
  exports: [AdminDashboardComponent]
})
export class AdminModule { }
 