import { Component } from '@angular/core';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-returns',
  standalone: false,
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css',
})
export class ReturnsComponent implements OnInit {
  returns: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
 
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() { this.loadReturns(); }
 
  loadReturns() {
    this.loading = true;
    this.adminService.getAllReturns().subscribe({
      next: (data) => { this.returns = Array.isArray(data)?data:[data]; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Failed to load returns.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }
 
  approve(returnId: number) {
    this.adminService.processReturn(returnId, true).subscribe({
      next: () => { this.actionMsg = 'Return approved. Refund initiated.'; this.loadReturns(); },
      error: () => { this.actionMsg = 'Failed to approve return.'; }
    });
  }
 
  reject(returnId: number) {
    this.adminService.processReturn(returnId, false).subscribe({
      next: () => { this.actionMsg = 'Return rejected.'; this.loadReturns(); },
      error: () => { this.actionMsg = 'Failed to reject return.'; }
    });
  }
}
 
