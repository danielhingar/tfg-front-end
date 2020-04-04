import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-statistics-product-client',
  templateUrl: './statistics-product-client.component.html',
  styleUrls: ['./statistics-product-client.component.css']
})
export class StatisticsProductClientComponent implements OnInit {

  clients: string[] = [];
  products: number[] = [];
  colores: string[] = [];
  graphic1 = [];


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadProductByCompany();
  }

  loadProductByCompany(): void {
    this.adminService.getProductByClient().subscribe(
      response => {
        for (const clave in response) {
          if (response.hasOwnProperty(clave)) {
            this.clients.push(clave);
            this.products.push(response[clave]);
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.colores.push('#' + randomColor);
          }
        }
        this.graphic1 = new Chart('graphic1', {
          type: 'pie',
          data: {
            labels: this.clients,
            datasets: [
              {
                data: this.products,
                backgroundColor: this.colores,
                hoverBackgroundColor: this.colores,
                fill: true,
              }

            ],

          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: false
              }],
            }
          }
        });
      }
    );
  }


}
