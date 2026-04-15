import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.css'],
  standalone: false
})
export class DashboardHomeComponent implements OnInit {
  revenue: number = 0;
  totalOrders: number = 0;
  myProfile: any = {};
  setupMode = false;
  storeName = '';

  constructor(private sellerService: SellerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkProfile();
  }

  private checkProfile(): void {
    this.sellerService.myProfile().subscribe({
      next: (profile) => {
        this.myProfile = profile;
        this.loadStats(); // Load stats after profile is confirmed
      },
      error: () => {
        this.setupMode = true;
        this.cdr.detectChanges();
      }
    });
  }

  loadStats(): void {
  // 1. Fetch the commission list
  this.sellerService.getCommission().subscribe({
    next: (commRes) => {
      let latestCommission = 0;

      // Logic: If the backend returns an array, take the last one. 
      // If it returns a single object, use that.
      if (Array.isArray(commRes)) {
        if (commRes.length > 0) {
          // Grabbing the very last entry in the list (the newest)
          const latestObj = commRes[commRes.length - 1];
          latestCommission = latestObj.percentage || latestObj.Percentage || 0;
        }
      } else {
        latestCommission = commRes.percentage || commRes.Percentage || 0;
      }

      // 2. Now fetch orders and apply that specific commission
      this.sellerService.getSellerOrders().subscribe({
        next: (orders: any[]) => {
          this.totalOrders = orders.length;

          const totalEarned = orders.reduce((total, o) => {
            const price = o.unitPrice || o.UnitPrice || 0;
            const qty = o.quantity || o.Quantity || 0;
            return total + (price * qty);
          }, 0);

          // Apply only the latest commission found
          this.revenue = totalEarned * (1 - (latestCommission / 100));
          
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Could not load orders', err)
      });
    },
    error: (err) => {
      console.warn('Commission not found, defaulting to gross revenue');
      this.loadGrossStats();
    }
  });
}

  // Fallback method if commission API fails
  loadGrossStats(): void {
  this.sellerService.getSellerOrders().subscribe({
    next: (res: any[]) => {
      this.totalOrders = res.length;
      this.revenue = res.reduce((total, o) => {
        const price = o.unitPrice || o.UnitPrice || 0;
        const qty = o.quantity || o.Quantity || 0;
        return total + (price * qty);
      }, 0);
      this.cdr.detectChanges();
    }
  });
}

  registerSellerProfile(): void {
    if (!this.storeName.trim()) return;
    this.sellerService.registerSellerProfile(this.storeName).subscribe({
      next: () => {
        this.setupMode = false;
        this.checkProfile();
      }
    });
  }
}