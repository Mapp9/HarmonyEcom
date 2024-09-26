import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  order: any;
  orderId: number = 0; // Variable para almacenar el ID de la orden
  productDetails: any[] = [];
  userDetails: any = null;

  constructor(private sessionStorage: SessionStorageService, private orderService:OrderService, private homeService:HomeService,private userService:UserService) { }

  ngOnInit(): void {
    // Recuperar el objeto de la orden del SessionStorage
    const order = this.sessionStorage.getItem('order');
    
    if (order && order.id) {
      this.orderId = order.id;  // Acceder directamente al ID
      console.log('Order ID:', this.orderId);
      this.loadOrderById(this.orderId);
    } else {
      console.error('No se encontró el objeto de la orden o el ID es nulo');
    }
  }

  loadOrderById(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(
      data => {
        this.order = data;
        console.log('Detalles de la orden desde la base de datos:', this.order);

        this.loadUserDetails(this.order.userId);

        this.order.orderProducts.forEach((orderProduct: any) => {
          this.loadProductDetails(orderProduct.productId);
        }
      )
      }
    )
  }

  loadProductDetails(productId:number) {
    this.homeService.getProductById(productId).subscribe(
      productData => {
        this.productDetails.push(productData);
        console.log('Detalles del producto:', productData);
      }
    )
  }

  loadUserDetails(userId:number){
    this.userService.getUserById(userId).subscribe(
      userData => {
        this.userDetails = userData;
        console.log('Detalles del usuario:', this.userDetails);
      },
      error => {
        console.error('Error al cargar los detalles del usuario', error);
      }
    )

  }

  generatePDF(){
    const doc = new jsPDF();
    doc.text('Detalles del Pedido', 10, 10);

    // Información del usuario
    doc.text('Detalles del Usuario:', 10, 20);
    doc.text(`Nombre: ${this.userDetails.firstName} ${this.userDetails.lastName}`, 10, 30);
    doc.text(`Email: ${this.userDetails.email}`, 10, 40);
    doc.text(`Dirección: ${this.userDetails.address}`, 10, 50);
    doc.text(`Celular: ${this.userDetails.cellphone}`, 10, 60);

    // Información de la orden
    doc.text('Detalles de la Orden:', 10, 70);
    doc.text(`ID de la Orden: ${this.order.id}`, 10, 80);
    doc.text(`Fecha de Creación: ${new Date(this.order.dateCreated).toLocaleDateString()}`, 10, 90);
    doc.text(`Estado de la Orden: ${this.order.orderState}`, 10, 100);
    doc.text(`Total de la Orden: ${this.order.totalOrderPrice}`, 10, 110);

    // Tabla de productos en la orden
    const products = this.order.orderProducts.map((orderProduct: any, index: number) => [
      index + 1,
      this.productDetails[index].name,
      orderProduct.quantity,
      orderProduct.price,
      (orderProduct.quantity * orderProduct.price).toFixed(2)
    ]);

    // Añadir tabla de productos
    autoTable(doc, {
      head: [['#', 'Producto', 'Cantidad', 'Precio Unitario', 'Total']],
      body: products,
      startY: 120,
    });

    // Guardar el PDF
    doc.save('detalles-orden.pdf');
  }

}
