import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.html',
  styleUrls: ['./store-manager.css'],
  standalone: false
})
export class StoreManager implements OnInit {
  // REMOVED rating from the entry object
  store = { categoryFocus: '', status: 'Active' };
  stores: any[] = [];
  profileStatus: string = ''; 

  constructor(
    private storeService: StoreService,
    private sellerService: SellerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkProfileAndLoad();
  }

  checkProfileAndLoad() {
    this.sellerService.myProfile().subscribe({
      next: (p) => {
        this.profileStatus = p.complianceStatus;
        this.loadStores();
      },
      error: () => this.profileStatus = 'unregistered'
    });
  }

  loadStores() {
    this.storeService.getStores().subscribe({
      next: (data) => {
        this.stores = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Could not load stores", err)
    });
  }

  createStore() {
    if (!this.store.categoryFocus.trim()) return;
    
    this.storeService.createStore(this.store).subscribe({
      next: () => {
        alert('Store Attributes Added!');
        this.store.categoryFocus = '';
        this.loadStores();
      },
      error: (err) => alert('Failed to add store: ' + (err.error?.message || err.message))
    });
  }

  toggleStatus(item: any) {
    const id = item.storeId || item.storeID; 
    const currentStatus = item.status || item.Status;
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    this.storeService.updateStatus(id, newStatus).subscribe({
      next: () => this.loadStores(),
      error: (err) => alert('Update failed')
    });
  }

  deleteStore(item: any) {
    const id = item.storeId || item.storeID;
    if (confirm('Delete this store attribute?')) {
      this.storeService.deleteStore(id).subscribe({
        next: () => this.loadStores(),
        error: (err) => alert('Delete failed')
      });
    }
  }
}