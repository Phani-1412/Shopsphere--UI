export interface Product {
  id?: number;
  Name: string;
  Price: number;
  SKU: string;
  CategoryId: number; // Ensure this matches the JSON property name
  Status: string;
  StoreId:number;
}