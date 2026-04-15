import { Component, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.html',
  standalone: false,
  styleUrls: ['./inventory-manager.css']
})
export class InventoryManager {
  // MUST match the [(ngModel)] casing in your HTML exactly
  inventory = {
    ProductID: 0,
    AvailableQuantity: 0,
    ReorderThreshold: 0
  };

  result: any = null; // This holds the data for the "Current Stock Level" card
  actionMsg = '';
  errorMsg = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  CreateOrUpdate() {
    this.actionMsg = '';
    this.errorMsg = '';

    // We use { responseType: 'text' } because your backend returns a plain string
    this.api.post('inventory', this.inventory, { responseType: 'text' })
      .subscribe({
        next: (res: any) => {
          this.actionMsg = res; 
          this.getInventory(); // Refresh the result card immediately after saving
          setTimeout(() => this.actionMsg = '', 3000);
        },
        error: (err) => {
          this.errorMsg = 'Failed to save inventory. Ensure Product ID is valid.';
        }
      });
  }

  getInventory() {

    if (!this.inventory.ProductID) {
        this.errorMsg = "Please enter a valid Product ID first.";
        return;
    }

    this.api.get(`inventory/${this.inventory.ProductID}`)
      .subscribe({
        next: (res) => {
          console.log("Inventory Fetched:", res);
          this.result = res; // This triggers the *ngIf="result" in HTML
          this.errorMsg = '';
          this.cdr.detectChanges(); // Force the UI to show the new result
        },
        error: (err) => {
          this.errorMsg = 'Could not find inventory for this Product ID.';
          this.result = null; // Hide the card if no data found
        }
      });
  }
}