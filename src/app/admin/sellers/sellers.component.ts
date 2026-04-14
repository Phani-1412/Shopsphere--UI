import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-sellers',
  standalone: false,
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css',
})
export class SellersComponent implements OnInit {
  sellers: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
  rejectingSellerId: number | null = null;
  rejectReason = '';
 
  constructor(private adminService: AdminService) {}
 
  ngOnInit() { this.loadSellers(); }
 
  loadSellers() {
    this.loading = true;
    this.adminService.getAllSellers().subscribe({
      next: (data) => { this.sellers = data; this.loading = false; },
      error: () => { this.error = 'Failed to load sellers.'; this.loading = false; }
    });
  }
 
  approve(sellerId: number) {
    this.adminService.approveSeller(sellerId).subscribe({
      next: () => { this.actionMsg = 'Seller approved!'; this.loadSellers(); },
      error: () => { this.actionMsg = 'Failed to approve.'; }
    });
  }
 
  openReject(sellerId: number) {
    this.rejectingSellerId = sellerId;
    this.rejectReason = '';
  }
 
  submitReject() {
    if (!this.rejectReason.trim() || this.rejectingSellerId === null) return;
    this.adminService.rejectSeller(this.rejectingSellerId, this.rejectReason).subscribe({
      next: () => { this.actionMsg = 'Seller rejected.'; this.rejectingSellerId = null; this.loadSellers(); },
      error: () => { this.actionMsg = 'Failed to reject.'; }
    });
  }
 
  cancelReject() { this.rejectingSellerId = null; this.rejectReason = ''; }
}
