import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'http://localhost:5105'; // Update to your port

  constructor(private http: HttpClient) { }

  // Fetch products belonging to the logged-in seller
  getMyProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/product/my-products`);
  }

  // Fetch stores belonging to the logged-in seller (Used for the dropdown)
  getMyStores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/api/store/my-stores`);
  }

  // Create a new product
createProduct(product: any): Observable<string> {
  return this.http.post(`${this.api}/api/Product/create`, product, { 
    responseType: 'text' 
  });
}
}