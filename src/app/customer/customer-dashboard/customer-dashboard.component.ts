import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-dashboard',
  standalone: false,
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent {

  activePanel: string | null = null;

  cards = [
    { icon: '🛍️', key: 'products',      label: 'Products',       description: 'Browse all available products',    category: 'Shopping' },
    { icon: '🗂️', key: 'categories',    label: 'By Category',    description: 'Filter products by category',      category: 'Shopping' },
    { icon: '🛒', key: 'cart',           label: 'My Cart',        description: 'View cart & checkout',             category: 'Shopping' },
    { icon: '📦', key: 'orders',         label: 'Order Details',  description: 'Track & view your orders',         category: 'Orders' },
    { icon: '💳', key: 'payment',        label: 'Payment',        description: 'Make a payment for an order',      category: 'Orders' },
    { icon: '🔁', key: 'returns',        label: 'Returns',        description: 'Request a return for an order',    category: 'Orders' },
    { icon: '🔔', key: 'notifications',  label: 'Notifications',  description: 'View your alerts & messages',      category: 'Account' },
  ];

  menuGroups = [
    { label: 'Shopping',  keys: ['products', 'categories', 'cart'] },
    { label: 'Orders',    keys: ['orders', 'payment', 'returns'] },
    { label: 'Account',   keys: ['notifications'] },
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
    window.location.href = '/landingpage';
  }
}
