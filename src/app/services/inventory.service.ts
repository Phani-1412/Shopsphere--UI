import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private api: ApiService) {}
  getMyProducts(): Observable<any[]> {
    return this.api.get('product/my-products') as Observable<any[]>;
  }
  getInventory(productId: number): Observable<Inventory> {
    return this.api.get(`inventory/${productId}`) as Observable<Inventory>;
  }
  saveInventory(data: any): Observable<string> {
  return this.api.post('inventory', data, { responseType: 'text' }) as any as Observable<string>;
}
}