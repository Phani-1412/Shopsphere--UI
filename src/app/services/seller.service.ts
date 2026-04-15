import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';
import { SellerOrder } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class SellerService {
  private baseUrl = 'http://localhost:5105/api'; // Your backend port

  constructor(private http: HttpClient) {}

  getSellerOrders(): Observable<SellerOrder[]> {
    return this.http.get<SellerOrder[]>(`${this.baseUrl}/order/seller-orders`);
  }
  
  updateOrderStatus(orderId: number, status: string):Observable<any> {
  return this.http.put(`${this.baseUrl}/order/${orderId}`, { status });
}

  CreateOrUpdate(data: Inventory): Observable<any> {
    return this.http.post(`${this.baseUrl}/inventory`, data);
  }

  myProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/seller/my-profile`);
  }

  registerSellerProfile(storeName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/seller`, { storeName });
  }

  getCommission(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commission`);
  }
}