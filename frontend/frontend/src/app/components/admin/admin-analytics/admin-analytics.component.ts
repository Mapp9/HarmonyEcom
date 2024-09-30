import { Component, OnInit } from '@angular/core';
import { ArcElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PieController, PointElement, Title, Tooltip } from 'chart.js';
import { AnalitycsService } from 'src/app/services/analitycs.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {

  constructor(private analitycsService: AnalitycsService, private productService:ProductService ) {}
  ngOnInit(): void {
    this.loadSalesData();
    this.loadTopProductsData();
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, PieController, ArcElement, Legend, Tooltip);
  }


  loadSalesData() {
    this.analitycsService.getSalesByDay().subscribe((data: any[]) => {
      const labels = data.map(sale => sale[0]);
      const salesData = data.map(sale => sale[1]);

      new Chart("salesChart", {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ventas por Día',
            data: salesData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  loadTopProductsData() {
    this.analitycsService.getTopSellingProducts().subscribe((data: any[]) => {
      const labels = data.map(product => product[0]); // Aquí usas el nombre del producto
      const quantities = data.map(product => product[1]); // Aquí usas la cantidad vendida
  
      const topProductsChartElement = document.getElementById('topProductsChart') as HTMLCanvasElement;
      if (topProductsChartElement) {
        new Chart(topProductsChartElement, {
          type: 'pie',
          data: {
            labels: labels, // Ahora los nombres de los productos se mostrarán como etiquetas
            datasets: [{
              label: 'Productos más vendidos',
              data: quantities,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true
          }
        });
      }
    });
  }
  

}
