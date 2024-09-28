import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderProduct } from 'src/app/common/order-product';
import { Product } from 'src/app/common/product';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: number|null = 0;
  orderState: string = '';
  orderProducts: OrderProduct [] = [];
  productsDetails: Product [] = [];
  totalOrder: number = 0;
  userId: number = 0;
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  address : string = ''; 
  pageTitle: string = 'Detalles de la orden'

  constructor(
    private userService:UserService,
    private orderService:OrderService,
    private productService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  )
  {}
  
  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    console.log(this.orderId)
    this.route.params.subscribe(
      order => {
        let orderId = order['id'];
        if(orderId){
          this.orderService.getOrderById(orderId).subscribe(
            data => {
              this.orderId = data.id;
              this.orderProducts = data.orderProducts;
              this.orderState = data.orderState;
              this.userId = data.userId;
              this.totalOrder = this.calculateTotalOrder(data.orderProducts);
              this.loadProductsDetails();
              this.getUserById(this.userId);
            }
          )
        }
      }
    )
  }

  loadProductsDetails() {
    this.orderProducts.forEach(orderProduct => {
      this.productService.getProductById(orderProduct.productId).subscribe(
        product => {
          this.productsDetails.push(product); // Añadimos los detalles completos de cada producto
        },
        error => {
          console.error(`Error al cargar los detalles del producto con ID ${orderProduct.productId}:`, error);
        }
      );
    });
  }

  getUserById(userId: number){
    this.userService.getUserById(userId).subscribe(
      data => {
        this.firstName = data.firstName
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;;
      }
    )
  }

  calculateTotalOrder(orderProducts: OrderProduct[]): number {
    return orderProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
  
  generatePDF(): void{
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Detalles de la Orden', 10, 10);


    doc.setFontSize(14);
    doc.text(`Nombre del Cliente: ${this.firstName} ${this.lastName}`, 10, 20);
    doc.text(`Email: ${this.email}`, 10, 30);
    doc.text(`Dirección: ${this.address}`, 10, 40);

    doc.text(`Total de la Orden: ${this.totalOrder.toFixed(2)} COP`, 10, 60);

    const productRows = this.orderProducts.map((orderProduct, index) => {
      const productDetail = this.productsDetails.find(product => product.id === orderProduct.productId);
      return [
        index + 1,
        productDetail?.name || 'Producto no disponible',
        orderProduct.quantity,
        `${orderProduct.price.toFixed(2)} COP`,
        `${(orderProduct.price * orderProduct.quantity).toFixed(2)} COP`
      ];
    });

    autoTable(doc, {
      head: [['#', 'Producto', 'Cantidad', 'Precio Unitario', 'Total']],
      body: productRows,
      startY: 120,
    });
    doc.save(`orden_${this.orderId}.pdf`);
  }

  goBackToOrderList(): void {
    this.router.navigate(['/orders/history']);
  }


}
