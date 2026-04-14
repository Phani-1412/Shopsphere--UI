import { Component, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../customer.service';
 
@Component({
  selector: 'app-cust-returns',
  standalone: false,
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css'],
})
export class ReturnsComponent {
  orderId: number | null = null;
  reason: string = '';
  loading = false;
  successMsg = '';
  errorMsg = '';
 
  commonReasons = [
    'Product damaged on delivery',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    'Defective product',
  ];
 
  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {}
 
  selectReason(r: string) {
    this.reason = r;
  }
 
  submit() {
    if (!this.orderId || !this.reason.trim()) {
      this.errorMsg = 'Please enter an Order ID and a reason.';
      return;
    }
    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';
 
    this.customerService.createReturn(this.orderId, this.reason).subscribe({
      next: () => {
        this.successMsg = '✅ Return request submitted successfully!';
        this.loading = false;
        this.orderId = null;
        this.reason = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = typeof err?.error === 'string' ? err.error : 'Failed to submit return.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
 
 