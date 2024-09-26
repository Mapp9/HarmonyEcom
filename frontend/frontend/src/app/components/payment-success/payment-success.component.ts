import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/common/order-state';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private orderService:OrderService, private sessionStorage:SessionStorageService, private router:Router) { }

  ngOnInit(): void {
    console.log(this.sessionStorage.getItem('order'));
    let order = this.sessionStorage.getItem('order');
    let formData = new FormData();
    formData.append('id',order.id);
    formData.append('state', OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe(
      data => {
        console.log(data)

        console.log('LogoutComponent: '+this.sessionStorage.getItem('token'));

        setTimeout(()=>{
          this.router.navigate(['/payment/success/ticket']);
        }, 5000);
      }
    );
  }

}
