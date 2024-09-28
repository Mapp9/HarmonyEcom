import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { OrderState } from 'src/app/common/order-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];
  userId: number = 0;

  constructor(
    private orderService: OrderService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el ID del usuario autenticado desde sessionStorage
    this.userId = this.sessionStorage.getItem('token').id;
    
    // Cargar las órdenes del usuario
    this.loadUserOrders();
  }

  // Función para cargar las órdenes del usuario autenticado
  loadUserOrders() {
    this.orderService.getOrderByUser(this.userId).subscribe(
      data => {
        this.orders = data;
        console.log('Órdenes cargadas:', data);
      },
      error => {
        console.error('Error al cargar las órdenes:', error);
      }
    );
  }

  calculateTotal(order: Order): number {
    let total = 0;
    order.orderProducts.forEach(product => {
      total += product.price * product.quantity;
    });
    return total;
  }

}
