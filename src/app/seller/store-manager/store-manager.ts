import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model'; 

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.html',
  styleUrls: ['./store-manager.css'],
  standalone: false,
})
export class StoreManager implements OnInit {

  store: Store = {
    CategoryFocus: '',
    Rating: 0,
    Status: 'Active'
  };

  stores: Store[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  // ✅ CREATE STORE
  createStore(): void {
    this.storeService.createStore(this.store).subscribe({
      next: () => {
        alert('✅ Store created successfully');
        this.resetForm();
        this.loadStores();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to create store');
      }
    });
  }

  // ✅ GET STORES
  loadStores(): void {
    this.storeService.getStores().subscribe({
      next: (res) => this.stores = res,
      error: (err) => console.error(err)
    });
  }

  private resetForm(): void {
    this.store = {
      CategoryFocus: '',
      Rating: 0,
      Status: 'Active'
    };
  }
}