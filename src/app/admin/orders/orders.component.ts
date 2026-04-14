import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';
 
  constructor(private adminService: AdminService) {}
 
  ngOnInit() {
    this.adminService.getAllOrders().subscribe({
      next: (data) => { this.orders = data; this.loading = false; },
      error: () => { this.error = 'Failed to load orders.'; this.loading = false; }
    });
  }
}
 
