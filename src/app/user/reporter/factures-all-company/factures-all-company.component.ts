import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-factures-all-company',
  templateUrl: './factures-all-company.component.html',
  styleUrls: ['./factures-all-company.component.css']
})
export class FacturesAllCompanyComponent implements OnInit {

  opcionSeleccionada1 = '';
  status: string[] = ['PAGADO', 'EN PROCESO', 'ENVÍADO A SHOWCASE', 'DE CAMINO', 'RECIBIDO'];
  factures: Facture[] = [];
  paginador: any;
  constructor(private factureService: FactureService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFactures();
  }

  loadFactures(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.factureService.getFacturesAllCompany(page).subscribe(
        factures => {
          this.factures = factures.content as Facture[];
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

  payCompany(facture: Facture): void {
    this.factureService.payCompany(facture.id).subscribe(
      response => {
        this.router.navigate(['/home/page/0']);
        swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Intermediario',
          text: `Factura pagada a la compañía`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
      }
    );
  }
}
