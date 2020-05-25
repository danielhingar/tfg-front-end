import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FactureService } from '../facture.service';
import { Facture } from '../facture';
import { ItemBasket } from '../../basket/itemBasket';
import { AuthService } from '../../../../login/auth.service';
import swal from 'sweetalert2';
import { BasketService } from '../../basket/basket.service';
import { URL_BACKEND } from '../../../../config/config';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {

  facture: Facture = new Facture();
  status: string[] = [ 'EN PROCESO', 'ENVÍADO A SHOWCASE', 'DE CAMINO', 'RECIBIDO'];
  urlBackend: string = URL_BACKEND;
  constructor(private activatedRouter: ActivatedRoute, private factureService: FactureService, public authService: AuthService,
              private router: Router, private basketService: BasketService) { }

  ngOnInit() {
    this.loadFacture();
  }

  loadFacture(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.factureService.getFacture(id).subscribe((facture) => this.facture = facture);
      }
    });
  }

  public calculatePrice(itemBasket: ItemBasket): number {
    if (itemBasket.product.offert) {
      return (itemBasket.quantity * (itemBasket.product.price - (itemBasket.product.price * (itemBasket.product.offert / 100))));
    } else {
    return (itemBasket.quantity * itemBasket.product.price);
    }
  }

  

  public caculateTotal(): number {
    let total = 0.00;
    for (const item of this.facture.itemBaskets) {
      total = total + this.calculatePrice(item);
    }
    return total;
  }

  updateStatus(id1: number, event: any): void {
    const status: string = event.target.value as string;

    this.facture.itemBaskets.map((itemBasket: ItemBasket) => {
      if (id1 === itemBasket.id) {
      itemBasket.status = status;
      this.basketService.updateStatusItem(itemBasket).subscribe( response => {
        this.router.navigate([`/detailsFacture/`, this.facture.id]);
        swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Actualiación',
          text: `El estado de producto se ha modificado correctamente`,
          showConfirmButton: false,
          width: 350,
          timer: 2200,
        });
      });
      }
      return this.facture.itemBaskets;
    });
  }
}

