import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.html',
  styleUrls: ['./seller-dashboard.css'],
  standalone: false,
})
export class SellerDashboard {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
