import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import { SellerDashboard } from "./seller-dashboard/seller-dashboard";
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home";
import { InventoryManager } from "./inventory-manager/inventory-manager";
import { Order } from "./order-list/order-list";
import { ProductManagerComponent } from "./product-manager/product-manager";
import { StoreManager } from "./store-manager/store-manager";
import { MyProfile } from "./my-profile/my-profile";

const routes: Routes = [
    {
        path: '',
        component: SellerDashboard,
        children: [
            {path:'dashboard', component: DashboardHomeComponent},
            {path:'inventory', component: InventoryManager},
            {path:'orders', component: Order},
            {path:'products', component: ProductManagerComponent},
            {path:'stores', component: StoreManager},
            {path:'profile', component: MyProfile},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    declarations: [
        SellerDashboard,
        DashboardHomeComponent,
        InventoryManager,
        Order,
        ProductManagerComponent,
        StoreManager,
        MyProfile
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class SellerModule {}