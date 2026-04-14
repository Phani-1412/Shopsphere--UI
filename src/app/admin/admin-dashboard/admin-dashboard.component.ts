import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
 
  activePanel: string | null = null;
 
  cards = [
    { icon: '📊', key: 'analytics',   label: 'Analytics',   description: 'Platform stats & revenue',       category: 'Overview' },
    { icon: '👤', key: 'sellers',     label: 'Sellers',     description: 'Approve, reject & view sellers', category: 'Management' },
    { icon: '📦', key: 'orders',      label: 'Orders',      description: 'View all marketplace orders',    category: 'Management' },
    { icon: '⚖️', key: 'disputes',   label: 'Disputes',    description: 'Resolve customer disputes',      category: 'Operations' },
    { icon: '🔁', key: 'returns',     label: 'Returns',     description: 'Approve or reject returns',      category: 'Operations' },
    { icon: '🗂️', key: 'categories', label: 'Categories',  description: 'Manage product categories',      category: 'Configuration' },
    { icon: '📝', key: 'policies',    label: 'Policies',    description: 'Create and manage policies',     category: 'Configuration' },
    { icon: '💰', key: 'commission',  label: 'Commission',  description: 'Set marketplace commission %',   category: 'Configuration' },
  ];
 
  menuGroups = [
    { label: 'Overview',      keys: ['analytics'] },
    { label: 'Management',    keys: ['sellers', 'orders'] },
    { label: 'Operations',    keys: ['disputes', 'returns'] },
    { label: 'Configuration', keys: ['categories', 'policies', 'commission'] },
  ];

  getCard(key: string) {
    return this.cards.find(card => card.key === key) || { icon: '', label: ''};
  }
 
  openPanel(key: string) {
    this.activePanel = this.activePanel === key ? null : key;
  }
 
  closePanel() { this.activePanel = null; }
 
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
 
