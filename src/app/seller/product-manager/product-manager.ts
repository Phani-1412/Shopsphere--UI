import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.html',
  styleUrls: ['./product-manager.css'],
  standalone: false,
})
export class ProductManagerComponent implements OnInit {

  product: Product = {
    Name: '',
    Price: 0,
    SKU: '',
    StoreId: 0,
    CategoryId: 0
  };

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // ✅ CREATE PRODUCT
  addProduct(): void {
    this.productService.createProduct(this.product).subscribe({
      next: () => {
        alert('✅ Product created successfully');
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to create product');
      }
    });
  }

  // ✅ GET PRODUCTS
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error(err)
    });
  }

  private resetForm(): void {
    this.product = {
      Name: '',
      Price: 0,
      SKU: '',
      StoreId: 1,
      CategoryId: 3
    };
  }
}