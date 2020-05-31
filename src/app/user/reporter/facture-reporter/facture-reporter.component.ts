import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-facture-reporter',
  templateUrl: './facture-reporter.component.html',
  styleUrls: ['./facture-reporter.component.css']
})
export class FactureReporterComponent implements OnInit {

  opcionSeleccionada1 = '';
  status: string[] = ['PAGADO', 'EN PROCESO', 'ENVÍADO A SHOWCASE', 'DE CAMINO', 'RECIBIDO'];
  factures: Facture[] = [];
  factures1: Facture[] = [];
  paginador: any;
  clients: string[] = [];
  client1 = 'None';
  date: string;
  date1: string;
  pass: boolean;
  constructor(private factureService: FactureService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFactures();
    this.pass = false;
  }

  loadFactures(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.factureService.getFacturesAll(page).subscribe(
        factures => {
          this.factures = factures.content as Facture[];
          this.factures1 = factures.content as Facture[];
          this.paginador = factures;
        }
      );
    }
    );
  }

  count(facture: Facture): number {
    let total = 0;
    for ( const item of facture.itemBaskets) {
      total = total + item.quantity;
    }
    return total;
  }

  public calculatePrice(itemBasket: ItemBasket): number {
    return (itemBasket.quantity * itemBasket.product.price);
}

  public caculateTotal(facture: Facture): number {
    let total = 0.00;
    for (const item of facture.itemBaskets) {
       total = total + this.calculatePrice(item);
    }
    return total;
  }

  updateStatus(id1: number, event: any): void {
    const status: string = event.target.value as string;

    this.factures = this.factures.map((facture: Facture) => {
      if (id1 === facture.id) {
      facture.status = status;
      this.factureService.updateFactureReporter(facture).subscribe( response => {
        this.router.navigate(['/factures/page/0']);
        swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Actualización',
          text: `El estado se ha modificado correctamente`,
          showConfirmButton: false,
          width: 350,
          timer: 2200,
        });
      });
      }
      return facture;
    });
  }

    loadClients() {
      for (const facture of this.factures1) {
        if (!this.clients.includes(facture.client.username)) {
          this.clients.push(facture.client.username);
        }
      }
      return this.clients;
    }

    search() {
      if (this.date === undefined && this.date1 === undefined) {
        this.factures = [];
        this.factures = this.factures1;
        if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.client1) {
          this.factures = this.factures.filter(res => {
            return res.client.username.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
          });
        }
      }

      if (this.date !== undefined ) {  
        this.factures = [];
        this.factures = this.factures1.filter(res => {
          const date3 = moment(this.date).format('YYYY-MM-DD');
          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date3).isBefore(date4)) {
            return this.factures.push(res);
          }
        });
        if (this.date1 !== undefined) {
          this.factures = this.factures.filter(res => {
            const date3 = moment(this.date1).format('YYYY-MM-DD');
            const date4 = moment(res.createDate).format('YYYY-MM-DD');
            if (moment(date4).isBefore(date3)) {
              return this.factures.push(res);
            }
          });
        }
        if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.client1) {
          this.factures = this.factures.filter(res => {
            return res.client.username.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
          });
        }

      }

      if (this.date1 !== undefined ) {

        this.factures = [];
        this.factures = this.factures1.filter(res => {
          const date3 = moment(this.date1).format('YYYY-MM-DD');
  
          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date4).isBefore(date3)) {
            return this.factures.push(res);
          }
        });
        if (this.date !== undefined) {
          this.factures = this.factures.filter(res => {
            const date3 = moment(this.date).format('YYYY-MM-DD');

            const date4 = moment(res.createDate).format('YYYY-MM-DD');
            if (moment(date3).isBefore(date4)) {
              return this.factures.push(res);
            }
          });
        }
        if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.client1) {
          this.factures = this.factures.filter(res => {
            return res.client.username.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
          });
        }

      }
  
    }
    removeDate() {
      this.date = undefined;
    }
  
    removeDate1() {
      this.date1 = undefined;
    }
}

