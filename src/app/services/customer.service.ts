import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  private api = 'http://localhost:5105';
 
  constructor(private http: HttpClient) { }
 
  // ── PRODUCTS ─────────────────────────────────────────────
  // GET /api/product/all  (AllowAnonymous)
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/product/all`);
  }
 
  // GET /api/product?categoryId=X  (Customer role)
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/product`, {
      params: { categoryId: categoryId.toString() }
    });
  }
 
  // ── CATEGORIES ────────────────────────────────────────────
  // GET /api/category  (AllowAnonymous)
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/category`);
  }
 
  // ── CART ──────────────────────────────────────────────────
  // GET /api/order/cart
  getCart(): Observable<any> {
    return this.http.get<any>(`${this.api}/api/order/cart`);
  }
 
  // POST /api/order/cart/add  { productId, quantity }
  addToCart(productId: number, quantity: number, productName: string): Observable<any> {
    return this.http.post(`${this.api}/api/order/cart/add`, { ProductId: productId, Quantity: quantity, ProductName: productName }, { responseType: 'text' });
  }
 
  // DELETE /api/order/cart/remove/{productId}
  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.api}/api/order/cart/remove/${productId}`, { responseType: 'text' });
  }
 
  // POST /api/order/cart/checkout
  checkout(): Observable<any> {
    return this.http.post(`${this.api}/api/order/cart/checkout`, {}, { responseType: 'text' });
  }
 
  // ── ORDERS ────────────────────────────────────────────────
  // GET /api/order/{orderId}  (Authorize - any role)
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/api/order/${orderId}`);
  }
 
  // ── PAYMENT ───────────────────────────────────────────────
  // POST /api/payment  { orderId, amount, method }
  createPayment(orderId: number, amount: number, method: string): Observable<any> {
    return this.http.post(`${this.api}/api/payment`, { OrderID: orderId, Amount: amount, Method: method }, { responseType: 'text' });
  }
 
  // ── RETURNS ───────────────────────────────────────────────
  // POST /api/return  { orderId, reason }
  createReturn(orderId: number, reason: string): Observable<any> {
    return this.http.post(`${this.api}/api/return`, { OrderID: orderId, Reason: reason }, { responseType: 'text' });
  }
 
  // ── NOTIFICATIONS ─────────────────────────────────────────
  // GET /api/notification
  getMyNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/notification`);
  }
 
  // PUT /api/notification/{notificationId}
  markNotificationRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.api}/api/notification/${notificationId}`, {});
  }
}
 
 