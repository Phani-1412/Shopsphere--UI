import { Component, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
 
@Component({
  selector: 'app-cust-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  orderId: number | null = null;
  amount: number | null = null;
  method: string = 'Card';
  methods = ['Card', 'UPI', 'NetBanking', 'COD', 'Wallet'];
  loading = false;
  successMsg = '';
  errorMsg = '';
 
  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {}
 
  submit() {
    if (!this.orderId || !this.amount || this.amount <= 0) {
      this.errorMsg = 'Please fill in all fields correctly.';
      return;
    }
    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';
 
    this.customerService.createPayment(this.orderId, this.amount, this.method).subscribe({
      next: (res) => {
        this.successMsg = `✅ Payment of ₹${this.amount} via ${this.method} recorded successfully!`;
        this.loading = false;
        this.orderId = null;
        this.amount = null;
        this.method = 'Card';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = typeof err?.error === 'string' ? err.error : 'Payment failed. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
 
 