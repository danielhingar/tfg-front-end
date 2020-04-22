import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
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
    this.adminService.getProductByCompany().subscribe(
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
          type: 'polarArea',
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
