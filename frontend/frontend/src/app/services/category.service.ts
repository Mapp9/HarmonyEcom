import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = 'http://localhost:8085/api/v1/admin/categories'
  constructor(private http:HttpClient) { }

  getCategoryList(){

  }

  createCategory(category:Category){

  }

  deleteCategory(id:number){

  }

  getCategoryById(id:number){
    
  }
}
