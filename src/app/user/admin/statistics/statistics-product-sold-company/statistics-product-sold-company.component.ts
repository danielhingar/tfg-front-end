import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-statistics-product-sold-company',
  templateUrl: './statistics-product-sold-company.component.html',
  styleUrls: ['./statistics-product-sold-company.component.css']
})
export class StatisticsProductSoldCompanyComponent implements OnInit {
  company: string[] = [];
  products: number[] = [];
  colores: string[] = [];
  graphic1 = [];
  loading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadProductByCompany();
  }

  loadProductByCompany(): void {
    this.adminService.getProductSoldByCompany().subscribe(
      response => {
        for (const clave in response) {
          if (response.hasOwnProperty(clave)) {
            this.company.push(clave);
            this.products.push(response[clave]);
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.colores.push('#' + randomColor);
          }
        }
        this.graphic1 = new Chart('graphic1', {
          type: 'doughnut',
          data: {
            labels: this.company,
            datasets: [
              {
                data: this.products,
                backgroundColor: this.colores,
                hoverBackgroundColor: this.colores,
              }
            ],
          },
          options: {
            legend: {
              display: true,
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
    this.loading = false;
  }

}
