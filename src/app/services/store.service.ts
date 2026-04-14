import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseUrl = 'http://localhost:5105/api';

  constructor(private http: HttpClient) {}

  // ✅ CREATE STORE
  createStore(store: Store): Observable<any> {
    return this.http.post(`${this.baseUrl}/sellerstore/create`, store);
  }

  // ✅ GET STORES (adjust endpoint if backend differs)
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/sellerstore/my-stores`);
  }
}
