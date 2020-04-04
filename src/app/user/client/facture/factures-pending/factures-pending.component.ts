import { Component, OnInit } from '@angular/core';
import { Facture } from '../facture';
import { FactureService } from '../facture.service';
import { AuthService } from '../../../../login/auth.service';
import { ItemBasket } from '../../basket/itemBasket';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ShippingService } from '../../../admin/shipping/shipping.service';
import { Shipping } from 'src/app/user/admin/shipping/shipping';

@Component({
  selector: 'app-factures-pending',
  templateUrl: './factures-pending.component.html',
  styleUrls: ['./factures-pending.component.css']
})
export class FacturesPendingComponent implements OnInit {

  facture: Facture;
  facture1: Facture = new Facture();
  shippings: Shipping[];
  constructor(private factureService: FactureService, private authService: AuthService, private router: Router,
              private shippingService: ShippingService) { }

  ngOnInit() {
    this.loadFacturesPending(this.authService.usuario.username);
    this.shippingService.getShippings().subscribe(shippings => this.shippings = shippings);
  }


  loadFacturesPending(username): void {
    this.factureService.getFacturesPending(username).subscribe(
      facture => this.facture = facture
    );
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

update(): void {
  this.factureService.updateFacture(this.facture, this.authService.usuario.username).subscribe( facture => {
    this.router.navigate(['/home/page/0']);
    swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Pedidos',
      text: `Su pedido ha sido realizado, gracias por su compra`,
      showConfirmButton: false,
      width: 350,
      timer: 2200,
    });
  });
}

createFacturas(): void {
  this.factureService.createFacture(this.facture, this.authService.usuario.username).subscribe(response => {

  });
}
}
