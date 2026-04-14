import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsComponent } from './products/products.component';
import { ReturnsComponent } from './returns/returns.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    OrdersComponent,
    PaymentComponent,
    ReturnsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
  ],
  exports: [CustomerDashboardComponent]
})
export class CustomerModule { }
