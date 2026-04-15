import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.html',
  standalone: false
})
export class ProductManagerComponent implements OnInit {
  // Use 'any' to allow CategoryId and Status without strict interface issues
  product: any = { 
    Name: '', 
    price: 0, 
    SKU: '', 
    StoreId: 1, 
    CategoryId: null,
    Status: 'Active'
  };

  products: any[] = [];

  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        console.log(res);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Load failed", err)
    });
  }

  addProduct() {
    // Final safety check
    if (!this.product.Name || !this.product.SKU || !this.product.CategoryId) return;

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to add product. Check if the SKU is unique.');
      }
    });
  }

  resetForm() {
    this.product = { 
      Name: '', 
      price: 0, 
      SKU: '', 
      StoreId: 1, 
      Status: 'Active'
    };
    this.cdr.detectChanges();
  }
}