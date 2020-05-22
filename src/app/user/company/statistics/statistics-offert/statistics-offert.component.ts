import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { AuthService } from '../../../../login/auth.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-statistics-offert',
  templateUrl: './statistics-offert.component.html',
  styleUrls: ['./statistics-offert.component.css']
})
export class StatisticsOffertComponent implements OnInit {

  clients: string[] = [];
  products: number[] = [];
  colores: string[] = [];
  graphic1 = [];
  loading = true;

  constructor(private companyService: CompanyService, private authService: AuthService) { }

  ngOnInit() {
    this.loadProductOffert();
  }

  loadProductOffert(): void {
    this.companyService.getProductOffert(this.authService.usuario.username).subscribe(
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
    this.loading = false;
  }


}
