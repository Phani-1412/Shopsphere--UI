import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../customer.service';
 
@Component({
  selector: 'app-cust-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  loading = false;
  error = '';
  actionMsg = '';
 
  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() { this.loadNotifications(); }
 
  loadNotifications() {
    this.loading = true;
    this.customerService.getMyNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load notifications.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
 
  markRead(notif: any) {
    if (notif.status === 'Read') return;
    this.customerService.markNotificationRead(notif.notificationID).subscribe({
      next: () => {
        notif.status = 'Read';
        this.actionMsg = 'Marked as read.';
        this.cdr.detectChanges();
        setTimeout(() => { this.actionMsg = ''; this.cdr.detectChanges(); }, 2000);
      },
      error: () => { this.actionMsg = 'Failed to update.'; }
    });
  }
 
  get unreadCount(): number {
    return this.notifications.filter(n => n.status !== 'Read').length;
  }
}
 
 