import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.html',
  standalone: false
})
export class ProductManagerComponent implements OnInit {
  // StoreId starts as undefined to show the placeholder
  product: any = { 
    Name: '', 
    price: 0, 
    SKU: '', 
    StoreId: undefined, 
    CategoryId: null,
    Status: 'Active'
  };

  products: any[] = [];
  stores: any[] = []; 

  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSellerProducts();
    this.loadSellerStores(); 
  }

  loadSellerStores() {
    this.productService.getMyStores().subscribe({
      next: (data) => {
        this.stores = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error loading stores", err)
    });
  }

  loadSellerProducts() {
    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error loading your products", err)
    });
  }

  addProduct() {
    // Basic validation before sending to backend
    if (!this.product.Name || !this.product.SKU || !this.product.CategoryId || !this.product.StoreId) {
      alert('⚠️ Please fill all required fields including Store and Category.');
      return;
    }

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.resetForm();
        this.loadSellerProducts();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to add product. Ensure SKU is unique.');
      }
    });
  }

  resetForm() {
    this.product = { 
      Name: '', 
      price: 0, 
      SKU: '', 
      StoreId: undefined, 
      CategoryId: null,
      Status: 'Active'
    };
    this.cdr.detectChanges();
  }
}