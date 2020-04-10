import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

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
          title: 'Intermediario',
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

    searchClient( event: any): void {
      const client: string = event.target.value as string;
      if (client !== '') {
        this.pass = true;
        this.factures = this.factures1.filter(res => {
          return res.client.username.toLocaleLowerCase().match(client.toLocaleLowerCase());
        });
        } else if (client === '') {
          this.ngOnInit();
        }
      }

      cleanFilter() {
        this.loadFactures();
        this.pass = false;
      }
}

