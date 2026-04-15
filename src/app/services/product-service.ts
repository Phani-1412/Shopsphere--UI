import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5105/api/product';

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, product);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}