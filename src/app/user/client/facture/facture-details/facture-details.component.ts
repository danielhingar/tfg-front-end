import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FactureService } from '../facture.service';
import { Facture } from '../facture';
import { ItemBasket } from '../../basket/itemBasket';
import { AuthService } from '../../../../login/auth.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {

  facture: Facture = new Facture();

  constructor(private activatedRouter: ActivatedRoute, private factureService: FactureService, public authService: AuthService) { }

  ngOnInit() {
    this.loadFacture();
  }

  loadFacture(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.factureService.getFacture(id).subscribe( (facture) => this.facture = facture);
      }
    });
  }

public calculatePrice(itemBasket: ItemBasket): number {
    return (itemBasket.quantity * itemBasket.product.price);
}

public caculateTotal(): number {
  let total = 0.00;
  for (const item of this.facture.itemBaskets) {
     total = total + this.calculatePrice(item);
  }
  return total;
}

}
