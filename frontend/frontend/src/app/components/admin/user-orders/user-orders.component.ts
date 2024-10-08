import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/common/order';
import { AdminOrderService } from 'src/app/services/admin-order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  userId: number = 0;
  username: string = '';
  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: AdminOrderService,
    private userService: UserService
    
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.getUserOrders();
    
  }

  getUserOrders() {
    this.orderService.getOrderByUser(this.userId).subscribe((data) => {
      this.orders = data;
    });
    this.userService.getUserById(this.userId).subscribe(
      (userData) => {
        this.username = userData.email
      }
    )

  }

  calculateTotal(order: Order): number {
    let total = 0;
    order.orderProducts.forEach(product => {
      total += product.price * product.quantity;
    });
    return total;
  }

}
