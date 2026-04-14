import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = 'http://localhost:5105';
 
  constructor(private http: HttpClient) { }
 
  getPlatformStats(): Observable<any> {
    return this.http.get(`${this.api}/api/analytics/platform`);
  }
 
  getAllSellers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/seller`);
  }
 
  approveSeller(sellerId: number): Observable<any> {
    return this.http.put(`${this.api}/api/seller/approve/${sellerId}`, {});
  }
 
  rejectSeller(sellerId: number, reason: string): Observable<any> {
    return this.http.put(`${this.api}/api/seller/reject/${sellerId}`, { reason });
  }
 
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/order/all`);
  }
 
  getAllDisputes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/dispute`);
  }
 
  resolveDispute(disputeId: number, resolutionNote: string): Observable<any> {
    return this.http.put(`${this.api}/api/dispute/resolve/${disputeId}`, { resolutionNote });
  }
 
  getAllReturns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/return/all`);
  }
 
  processReturn(returnId: number, approve: boolean): Observable<any> {
    return this.http.put(`${this.api}/api/return/${returnId}`, { approve });
  }
 
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/category`);
  }
 
  createCategory(name: string, parentCategoryID: number | null): Observable<any> {
    return this.http.post(`${this.api}/api/category`, { name, parentCategoryID });
  }
 
  getAllPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/policy`);
  }
 
  createPolicy(title: string, content: string): Observable<any> {
    return this.http.post(`${this.api}/api/policy`, { title, content });
  }
 
  updatePolicy(id: number, title: string, content: string): Observable<any> {
    return this.http.put(`${this.api}/api/policy/${id}`, { title, content });
  }
 
  deletePolicy(id: number): Observable<any> {
    return this.http.delete(`${this.api}/api/policy/${id}`);
  }
 
  getCommission(): Observable<any> {
    return this.http.get(`${this.api}/api/commission`);
  }
 
  setCommission(percentage: number): Observable<any> {
    return this.http.post(`${this.api}/api/commission`, { percentage });
  }
}
 