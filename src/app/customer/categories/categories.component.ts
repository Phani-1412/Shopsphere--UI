import { Component, OnInit } from '@angular/core';
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
 
  constructor(private customerService: CustomerService) {}
 
  ngOnInit() {
    this.customerService.getAllCategories().subscribe({
      next: (data) => { this.categories = data; this.loadingCats = false; },
      error: () => { this.error = 'Failed to load categories.'; this.loadingCats = false; }
    });
  }
 
  selectCategory(cat: any) {
    this.selectedCategory = cat;
    this.products = [];
    this.loadingProducts = true;
    this.addMsg = '';
 
    this.customerService.getProductsByCategory(cat.categoryID).subscribe({
      next: (data) => { this.products = data; this.loadingProducts = false; },
      error: () => { this.error = 'Failed to load products.'; this.loadingProducts = false; }
    });
  }
 
  clearSelection() {
    this.selectedCategory = null;
    this.products = [];
  }
 
  openAddToCart(productId: number) {
    this.addingProductId = productId;
    this.quantity = 1;
    this.addMsg = '';
  }
 
  cancelAdd() { this.addingProductId = null; }
 
  confirmAdd(productId: number) {
    if (this.quantity < 1) return;
    this.customerService.addToCart(productId, this.quantity,'').subscribe({
      next: () => { this.addMsg = 'Added to cart!'; this.addingProductId = null; },
      error: () => { this.addMsg = 'Failed to add to cart.'; }
    });
  }
}
 
 