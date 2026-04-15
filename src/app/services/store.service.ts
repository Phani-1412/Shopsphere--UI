import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private baseUrl = 'http://localhost:5105/api/SellerStore';

  constructor(private http: HttpClient) {}

  // Fetches from [HttpGet("my-stores")]
  getStores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my-stores`);
  }

  // Sends to [HttpPost("create")]
  createStore(storeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, storeData);
  }

  // Sends to [HttpPut("update-status/{storeId}")]
  updateStatus(storeId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-status/${storeId}`, { status });
  }

  // Sends to [HttpDelete("delete/{storeId}")]
  deleteStore(storeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${storeId}`);
  }
}