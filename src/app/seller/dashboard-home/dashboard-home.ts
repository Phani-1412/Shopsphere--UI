import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
  standalone: false
})
export class DashboardHomeComponent implements OnInit {
  revenue: number = 0;
  totalOrders: number = 0;
  myProfile: any = {};

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    // 1. Fetch Revenue using SellerService.GetRevenueAsync logic
    this.sellerService.getSellerOrders().subscribe(res => {
      this.revenue = res.reduce((total, order) => total + order.totalAmount, 0);
    });

    // 2. Fetch Orders using OrderService.GetSellerOrdersAsync logic
    this.sellerService.getSellerOrders().subscribe(orders => {
      this.totalOrders = orders.length;
    });

    // 3. Fetch Seller Profile using SellerService.GetSellerProfileAsync logic
      this.sellerService.myProfile().subscribe(profile => {
        this.myProfile = profile;
      });
    
  }
}