import { Component } from '@angular/core';
 
@Component({
  selector: 'app-logistics-dashboard',
  standalone: false,
  templateUrl: './logistics-dashboard.component.html',
  styleUrls: ['./logistics-dashboard.component.css'],
})
export class LogisticsDashboardComponent {
 
  activePanel: string | null = null;
 
  cards = [
    { icon: '🚚', key: 'shipments', label: 'Shipments', description: 'View and update shipment statuses' }
  ];
 
  openPanel(key: string) {
    this.activePanel = this.activePanel === key ? null : key;
  }
 
  closePanel() { this.activePanel = null; }
 
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
 