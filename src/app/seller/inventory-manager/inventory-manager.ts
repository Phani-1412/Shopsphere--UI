import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service'
@Component({
 selector: 'app-inventory-manager',
 templateUrl: './inventory-manager.html',
 standalone: false,
 styleUrls: ['./inventory-manager.css']
})
export class InventoryManager {
 inventory = {
   productId: 0,
   availableQuantity: 0,
   reorderThreshold: 0
 };
 result: any;
 constructor(private api: ApiService) {}
 CreateOrUpdate() {
   this.api.post('inventory', this.inventory)
     .subscribe(() => {
       alert('Saved successfully');
     });
 }
 getInventory() {
   this.api.get(`inventory/${this.inventory.productId}`)
     .subscribe(res => {
       this.result = res;
     });
 }
}