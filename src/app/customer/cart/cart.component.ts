import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../customer.service';
 
@Component({
  selector: 'app-cust-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = null;
  loading = false;
  error = '';
  actionMsg = '';
  checkingOut = false;
  cartEmpty = false;
 
  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() { this.loadCart(); }
 
  loadCart() {
    this.loading = true;
    this.error = '';
    this.customerService.getCart().subscribe({
      next: (data) => {
        if (data?.message === 'Cart is empty' || !data?.items || data?.items?.length === 0) {
          this.cartEmpty = true;
          this.cart = null;
        } else {
          this.cart = data;
          this.cartEmpty = false;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load cart.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
 
  removeItem(productId: number) {
    this.customerService.removeFromCart(productId).subscribe({
      next: () => { this.actionMsg = 'Item removed.'; this.loadCart(); },
      error: () => { this.actionMsg = 'Failed to remove item.'; }
    });
  }
 
  checkout() {
    this.checkingOut = true;
    this.customerService.checkout().subscribe({
      next: () => {
        this.actionMsg = '✅ Checkout successful! Your order has been placed.';
        this.checkingOut = false;
        this.loadCart();
      },
      error: () => {
        this.actionMsg = 'Checkout failed. Please try again.';
        this.checkingOut = false;
      }
    });
  }
 
  get cartTotal(): number {
    if (!this.cart?.items) return 0;
    return this.cart.items.reduce((sum: number, item: any) => {
      const price = item.price || item.Price || 0;
      const qty = item.quantity || item.Quantity || 0;
      return sum + (price * qty);
    }, 0);
  }
}
 
 