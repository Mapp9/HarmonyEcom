import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = 'http://localhost:8085/api/v1/admin/categories'
  constructor(private httpClient:HttpClient) { }

  getCategoryList():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.apiUrl);
  }

  createCategory(category:Category):Observable<Category>{
    return this.httpClient.post<Category>(this.apiUrl,category);
  }

  deleteCategoryById(id:number):Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.httpClient.get<Category>(`${this.apiUrl}/${id}`);
  }
}
