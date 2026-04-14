import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-disputes',
  standalone: false,
  templateUrl: './disputes.component.html',
  styleUrl: './disputes.component.css',
})
export class DisputesComponent implements OnInit {
  disputes: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
  resolvingId: number | null = null;
  resolutionNote = '';
 
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() { this.loadDisputes(); }
 
  loadDisputes() {
    this.loading = true;
    this.adminService.getAllDisputes().subscribe({
      next: (data) => { this.disputes = Array.isArray(data) ? data : [data]; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Failed to load disputes.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }
 
  openResolve(disputeId: number) { this.resolvingId = disputeId; this.resolutionNote = ''; }
 
  submitResolve() {
    if (!this.resolutionNote.trim() || this.resolvingId === null) return;
    this.adminService.resolveDispute(this.resolvingId, this.resolutionNote).subscribe({
      next: () => { this.actionMsg = 'Dispute resolved.'; this.resolvingId = null; this.loadDisputes(); },
      error: () => { this.actionMsg = 'Failed to resolve dispute.'; }
    });
  }
 
  cancelResolve() { this.resolvingId = null; this.resolutionNote = ''; }
}
 
