import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cust-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  selectedCategory: any = null;

  loadingCats = false;
  loadingProducts = false;
  error = '';
  addMsg = '';

  addingProductId: number | null = null;
  quantity = 1;

  constructor(private customerService: CustomerService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadingCats = true;
    this.customerService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data : [data];
        this.loadingCats = false;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load categories.';
        this.loadingCats = false;
        this.cdRef.detectChanges();
      }
    });
  }

 selectCategory(cat: any) {
  this.selectedCategory = cat;
  this.products = [];
  this.loadingProducts = true;
  this.error = '';

  const id = cat.categoryId || cat.categoryID || cat.id;

  if (!id) {
    this.error = 'Invalid Category ID';
    this.loadingProducts = false;
    return;
  }

  this.customerService.getProductsByCategory(id).subscribe({
    next: (data) => {
      this.products = Array.isArray(data) ? data : (data ? [data] : []);
      
      this.loadingProducts = false;
      this.cdRef.detectChanges();
    },
    error: (err) => {
      console.error("API Error:", err);
      this.error = 'Failed to load products.';
      this.loadingProducts = false;
      this.cdRef.detectChanges();
    }
  });
}

  clearSelection() {
    this.selectedCategory = null;
    this.products = [];
    this.error = '';
    this.addMsg = '';
  }

  openAddToCart(productId: any) {
    this.addingProductId = productId;
    this.quantity = 1;
    this.addMsg = '';
  }

  cancelAdd() {
    this.addingProductId = null;
  }

  confirmAdd(productId: number, productName: string) {
    if (this.quantity < 1) return;
    this.customerService.addToCart(productId, this.quantity, productName).subscribe({
      next: () => {
        this.addMsg = '✅ Added to cart!';
        this.addingProductId = null;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.addMsg = '❌ Failed to add to cart.';
      }
    });
  }
}