import { Component, OnInit } from '@angular/core';
import { Facture } from '../facture';
import { FactureService } from '../facture.service';
import { AuthService } from '../../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemBasket } from '../../basket/itemBasket';
import { ClaimService } from '../../../reporter/claim/claim.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Claim } from '../../../reporter/claim/claim';


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  factures: Facture[] = [];
  paginador: any;
  constructor(private factureService: FactureService, private authService: AuthService, private router: Router,
              private claimService: ClaimService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFactures(this.authService.usuario.username);
  }

  loadFactures(username): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.factureService.getFactures(page, this.authService.usuario.username).subscribe(
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
