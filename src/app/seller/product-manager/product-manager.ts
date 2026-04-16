import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.html',
  standalone: false
})
export class ProductManagerComponent implements OnInit {
  product: any = { 
    Name: '', 
    price: 0, 
    SKU: '', 
    CategoryId: null,
    Status: 'Active'
  };

  products: any[] = [];

  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadSellerProducts();
  }
  loadSellerProducts() {
    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading your products", err);
      }
    });
  }

  addProduct() {
  if (!this.product.Name || !this.product.SKU || !this.product.CategoryId || this.product.price <= 0) {
    alert('⚠️ Please fill in all required fields.');
    return;
  }

  this.productService.createProduct(this.product).subscribe({
    next: (res: string) => {
      alert('✅ ' + res); 
      this.resetForm();
      this.loadSellerProducts();
    },
    error: (err) => {
      console.error("Error:", err);
      const errorMsg = typeof err.error === 'string' ? err.error : 'Failed to add product.';
      alert('❌ ' + errorMsg);
    }
  });
}

  resetForm() {
    this.product = { 
      Name: '', 
      price: 0, 
      SKU: '', 
      CategoryId: null,
      Status: 'Active'
    };
    this.cdr.detectChanges();
  }
}