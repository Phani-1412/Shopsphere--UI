import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
 
@Component({
  selector: 'app-cust-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  loading = false;
  error = '';
  addMsg = '';
 
  // For add-to-cart inline
  addingProductId: number | null = null;
  quantity = 1;
  selectedProductName:string = '';
 
  constructor(private customerService: CustomerService, private cdRef: ChangeDetectorRef) {}
 
  ngOnInit() {
    this.loading = true;
  this.customerService.getAllProducts().subscribe({
    next: (data) => {
      console.log('Products:', data);
      this.products = data;
      this.loading = false;
      this.cdRef.detectChanges(); // Ensure view updates after data load
    },
    error: (err) => {
      console.log('Error:', err);
      this.error = 'Failed to load products.';
      this.loading = false;
      this.cdRef.detectChanges(); // Ensure view updates after error
    }
  });
}
 
  openAddToCart(productId: number,productName: string) {
    this.addingProductId = productId;
    this.selectedProductName=productName;
    this.quantity = 1;
    this.addMsg = '';
  }
 
  cancelAdd() {
    this.addingProductId = null;
  }
 
  confirmAdd(productId: number) {
    if (this.quantity < 1) return;
    this.customerService.addToCart(productId, this.quantity,this.selectedProductName).subscribe({
      next: () => {
        this.addMsg = 'Added to cart successfully!';
        this.addingProductId = null;
      },
      error: () => { this.addMsg = 'Failed to add to cart.'; }
    });
  }
}
 
 