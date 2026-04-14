import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  stats: any = null;
  loading = true;
  error = '';
 
  constructor(private adminService: AdminService) {}
 
  ngOnInit() {
    this.adminService.getPlatformStats().subscribe({
      next: (data) => { this.stats = data; this.loading = false; },
      error: () => { this.error = 'Failed to load analytics.'; this.loading = false; }
    });
  }
}
