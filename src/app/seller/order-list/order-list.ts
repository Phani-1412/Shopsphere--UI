import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
 
@Component({
  selector: 'app-orders',
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
  standalone: false,
})
export class Order implements OnInit {
 
  orders: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
 
  updatingOrderId: number | null = null;
  newStatus = '';
 
  statusOptions: { [key: string]: string[] } = {
    'placed':  ['paid', 'cancelled'],
    'paid':    ['packed'],
    'packed':  ['shipped'],
    'shipped': ['delivered']
  };
 
  constructor(private sellerService: SellerService) {}
 
  ngOnInit() { this.loadOrders(); }
 
  loadOrders() {
    this.loading = true;
    this.sellerService.getSellerOrders().subscribe({
      next: (data) => { this.orders = data; this.loading = false; },
      error: () => { this.error = 'Failed to load orders.'; this.loading = false; }
    });
  }
 
  getNextStatuses(currentStatus: string): string[] {
    return this.statusOptions[currentStatus?.toLowerCase()] || [];
  }
 
  getCurrentStatus(): string {
    if (this.updatingOrderId === null) return '';
    const order = this.orders.find(o => o.orderID === this.updatingOrderId);
    return order ? order.orderStatus : '';
  }
 
  openUpdate(orderId: number, currentStatus: string) {
    this.updatingOrderId = orderId;
    const options = this.getNextStatuses(currentStatus);
    this.newStatus = options.length > 0 ? options[0] : '';
    this.actionMsg = '';
  }
 
  submitUpdate() {
    if (!this.newStatus || this.updatingOrderId === null) return;
    this.sellerService.updateOrderStatus(this.updatingOrderId, this.newStatus).subscribe({
      next: () => {
        this.actionMsg = `Order #${this.updatingOrderId} updated to "${this.newStatus}"`;
        this.updatingOrderId = null;
        this.loadOrders();
      },
      error: () => { this.actionMsg = 'Failed to update order status.'; }
    });
  }
 
  cancelUpdate() { this.updatingOrderId = null; this.newStatus = ''; }
}
 