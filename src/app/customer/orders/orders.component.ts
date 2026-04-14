 import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../customer.service';
 
@Component({
  selector: 'app-cust-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderId: number | null = null;
  order: any = null;
  loading = false;
  error = '';
  searched = false;
 
  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() {}
 
  search() {
    if (!this.orderId || this.orderId < 1) return;
    this.loading = true;
    this.error = '';
    this.order = null;
    this.searched = true;
    this.customerService.getOrderDetails(this.orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.status === 404 ? 'Order not found.' : 'Failed to fetch order.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
 
 