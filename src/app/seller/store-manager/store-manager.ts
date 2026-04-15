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
  // Logic for the New Registration
  newStoreName: string = '';
  
  // Logic for existing stores
  store = { categoryFocus: '', status: 'Active' };
  stores: any[] = [];
  
  // profileStatus can be: 'unregistered', 'Pending', 'Approved', 'Rejected'
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
        if (p && p.sellerId) {
          this.profileStatus = p.complianceStatus;
          this.loadStores();
        } else {
          this.profileStatus = 'unregistered';
        }
      },
      error: () => {
        this.profileStatus = 'unregistered';
      }
    });
  }

  registerMerchant() {
  if (!this.newStoreName.trim()) return;

  this.sellerService.registerSellerProfile(this.newStoreName).subscribe({
    next: (res: any) => {
      alert(res.message || res || 'Registration successful!');
      this.checkProfileAndLoad(); 
    },
    error: (err) => {
      const errorMsg = err.error?.message || err.error || 'Server error';
      alert('Registration failed: ' + errorMsg);
      this.checkProfileAndLoad();
    }
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
      error: (err) => alert('Failed: ' + err.error)
    });
  }

  toggleStatus(item: any) {
    const id = item.storeId || item.storeID; 
    const newStatus = (item.status || item.Status) === 'Active' ? 'Inactive' : 'Active';
    this.storeService.updateStatus(id, newStatus).subscribe({
      next: () => this.loadStores()
    });
  }

  deleteStore(item: any) {
    const id = item.storeId || item.storeID;
    if (confirm('Delete this store?')) {
      this.storeService.deleteStore(id).subscribe({
        next: () => this.loadStores()
      });
    }
  }
}