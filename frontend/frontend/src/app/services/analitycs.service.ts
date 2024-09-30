import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AnalitycsService {

  private apiUrl : string = "http://localhost:8085/api/v1/admin/analytics";
  constructor(private httpClient: HttpClient, private headerService : HeaderService) { }

  getSalesByDay(): Observable<any[]> {
    console.log('Cargando datos de ventas por día'); // Log para verificar
    return this.httpClient.get<any[]>(`${this.apiUrl}/sales/day`, {headers:this.headerService.headers});
  }

  getSalesByMonth(): Observable<any[]> {

    return this.httpClient.get<any[]>(`${this.apiUrl}/sales/month`, {headers:this.headerService.headers});
  }

  getSalesByYear(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/sales/year`, {headers:this.headerService.headers});
  }

  getTopSellingProducts(): Observable<any[]> {
    console.log('Cargando datos de productos más vendidos');
    return this.httpClient.get<any[]>(`${this.apiUrl}/top-products`, {headers:this.headerService.headers});
  }
}
