import { Component, OnInit} from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-commission',
  standalone: false,
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.css',
})
export class CommissionComponent implements OnInit {
  current: any = null;
  loading = true;
  actionMsg = '';
  showForm = false;
  newPercentage: number | null = null;
 
  constructor(private adminService: AdminService) {}
 
  ngOnInit() { this.loadCommission(); }
 
  loadCommission() {
    this.loading = true;
    this.adminService.getCommission().subscribe({
      next: (data) => { this.current = data; this.loading = false; },
      error: () => { this.current = null; this.loading = false; }
    });
  }
 
  submit() {
    if (this.newPercentage === null || this.newPercentage < 0 || this.newPercentage > 100) {
      this.actionMsg = 'Please enter a valid percentage between 0 and 100.';
      return;
    }
    this.adminService.setCommission(this.newPercentage).subscribe({
      next: () => { this.actionMsg = 'Commission updated!'; this.showForm = false; this.loadCommission(); },
      error: () => { this.actionMsg = 'Failed to update commission.'; }
    });
  }
}
 
