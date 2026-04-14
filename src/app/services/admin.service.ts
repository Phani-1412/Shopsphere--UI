import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseurl = 'http://localhost:5105';
 
  constructor(private http: HttpClient) { }
 
  getAllSellers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/api/seller`);
  }
 
  approveSeller(sellerId: number): Observable<any> {
    return this.http.put(`${this.baseurl}/api/seller/approve/${sellerId}`, {});
  }
 
  rejectSeller(sellerId: number, reason: string): Observable<any> {
    return this.http.put(`${this.baseurl}/api/seller/reject/${sellerId}`, { reason });
  }
 
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/api/order/all`);
  }
 
  getAllDisputes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/api/dispute`);
  }
 
  resolveDispute(disputeId: number, resolutionNote: string): Observable<any> {
    return this.http.put(`${this.baseurl}/api/dispute/resolve/${disputeId}`, { resolutionNote });
  }
 
  getAllReturns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/api/return/all`);
  }
 
  processReturn(returnId: number, approve: boolean): Observable<any> {
    return this.http.put(`${this.baseurl}/api/return/${returnId}`, { approve });
  }
 
  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/api/category`);
  }
 
  createCategory(Name: string, ParentCategoryID: number | null): Observable<any> {
    return this.http.post(`${this.baseurl}/api/category`, { Name, ParentCategoryID });
  }
 
  getAllPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/api/policy`);
  }
 
  createPolicy(title: string, content: string): Observable<any> {
    return this.http.post(`${this.baseurl}/api/policy`, { title, content });
  }
 
  updatePolicy(id: number, title: string, content: string): Observable<any> {
    return this.http.put(`${this.baseurl}/api/policy/${id}`, { title, content });
  }
 
  deletePolicy(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/api/policy/${id}`);
  }
 
  getCommission(): Observable<any> {
    return this.http.get(`${this.baseurl}/api/commission`);
  }
 
  setCommission(percentage: number): Observable<any> {
    return this.http.post(`${this.baseurl}/api/commission`, { percentage });
  }
}
 