import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { AuthService } from '../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import swal from 'sweetalert2';


@Component({
  selector: 'app-facture-company',
  templateUrl: './facture-company.component.html',
  styleUrls: ['./facture-company.component.css']
})
export class FactureCompanyComponent implements OnInit {

  factures: Facture[] = [];
  paginador: any;
  constructor(private factureService: FactureService, private authService: AuthService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFactures(this.authService.usuario.username);
  }

  loadFactures(username): void  {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.factureService.getFacturesCompany(page, this.authService.usuario.username).subscribe(
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

}
