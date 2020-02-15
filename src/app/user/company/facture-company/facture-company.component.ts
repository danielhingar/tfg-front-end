import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { AuthService } from '../../../login/auth.service';
import { Router } from '@angular/router';
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
  constructor(private factureService: FactureService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadFactures(this.authService.usuario.username);
  }

  loadFactures(username): void {
    this.factureService.getFacturesCompany(username).subscribe(
      facture => this.factures = facture
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
