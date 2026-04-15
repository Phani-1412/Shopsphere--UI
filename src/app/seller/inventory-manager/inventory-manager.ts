import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.html',
  standalone: false
})
export class InventoryManager implements OnInit {
  inventory = {
    ProductID: null as number | null,
    AvailableQuantity: 0,
    ReorderThreshold: 0
  };

  myProducts: any[] = [];
  result: any = null;
  actionMsg = '';
  errorMsg = '';

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyProducts();
  }

  loadMyProducts() {
    this.inventoryService.getMyProducts().subscribe({
      next: (data) => {
        this.myProducts = data;
        this.cdr.detectChanges(); // Refresh UI after data loads
      },
      error: () => this.errorMsg = "Failed to load your products."
    });
  }

  CreateOrUpdate() {
    this.actionMsg = '';
    this.errorMsg = '';

    if (!this.inventory.ProductID) return;

    this.inventoryService.saveInventory(this.inventory).subscribe({
      next: (res) => {
        this.actionMsg = res;
        this.getInventory(); 
        setTimeout(() => this.actionMsg = '', 3000);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to update inventory.';
        this.cdr.detectChanges();
      }
    });
  }

  getInventory() {
    if (!this.inventory.ProductID) return;

    this.inventoryService.getInventory(this.inventory.ProductID).subscribe({
      next: (res: any) => {
        this.result = res;
        this.errorMsg = '';
        this.inventory.AvailableQuantity = res.availableQuantity ?? res.AvailableQuantity ?? 0;
        this.inventory.ReorderThreshold = res.reorderThreshold ?? res.ReorderThreshold ?? 0;
        
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'No inventory record found. Enter values to create one.';
        this.result = null;
        this.inventory.AvailableQuantity = 0;
        this.inventory.ReorderThreshold = 0;
        this.cdr.detectChanges();
      }
    });
  }
}