import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogisticsDashboardComponent } from './logistics-dashboard/logistics-dashboard.component';


const routes: Routes = [
  { path: '', component: LogisticsDashboardComponent }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule { }
 