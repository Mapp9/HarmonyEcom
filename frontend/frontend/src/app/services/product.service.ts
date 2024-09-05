import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL api products
  private apiUrl: string = "http://localhost:8085/api/v1/admin/products";

  constructor(private httpClient:HttpClient) { }
// Get all products
  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
// Create a product
  createProduct(formData:any):Observable<any>{
    return this.httpClient.post<Product>(this.apiUrl, formData);
  }
  // Delete a product
  deleteProductById(id:number):Observable<any>{
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }
  // Get a product by id
  getProductById(id:number):Observable<Product>{
    return this.httpClient.get<Product>(this.apiUrl + "/" + id);
    }
}
