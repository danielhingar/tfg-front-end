import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyService } from '../../company.service';
import { AuthService } from '../../../../login/auth.service';
@Component({
  selector: 'app-statistics-sold',
  templateUrl: './statistics-sold.component.html',
  styleUrls: ['./statistics-sold.component.css']
})
export class StatisticsSoldComponent implements OnInit {
  category: string[] = [];
  products: number[] = [];
  colores: string[] = [];
  graphic1 = [];
  loading = true;

  constructor(private companyService: CompanyService, private authService: AuthService) { }

  ngOnInit() {
    this.loadProductByCategory();
  }

  loadProductByCategory(): void {
    this.companyService.getProductSold(this.authService.usuario.username).subscribe(
      response => {
        for (const clave in response) {
          if (response.hasOwnProperty(clave)) {
            this.category.push(clave);
            this.products.push(response[clave]);
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.colores.push('#' + randomColor);
          }
        }
        this.graphic1 = new Chart('graphic1', {
          type: 'doughnut',
          data: {
            labels: this.category,
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
