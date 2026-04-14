import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private baseUrl = 'http://localhost:5105/api/Product';

  constructor(private http: HttpClient) {}
  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/product/create`, product);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/product/all`);
  }
}