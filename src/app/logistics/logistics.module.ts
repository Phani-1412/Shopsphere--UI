import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { LogisticsRoutingModule } from './logistics-routing.module';
import { LogisticsDashboardComponent } from './logistics-dashboard/logistics-dashboard.component';
import { ShipmentsComponent } from './shipments/shipments.component';
 
@NgModule({
  declarations: [
    LogisticsDashboardComponent,
    ShipmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LogisticsRoutingModule
  ]
})
export class LogisticsModule { }
 