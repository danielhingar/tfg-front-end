import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthService } from '../../../login/auth.service';
import { Router } from '@angular/router';
import { BasketService } from './basket.service';
import { ClientService } from '../client.service';
import { ItemBasket } from './itemBasket';
import { Product } from '../../company/products/product';
import Swal from 'sweetalert2';
import { FactureService } from '../facture/facture.service';
import { Facture } from '../facture/facture';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  itemBasket: ItemBasket[] = [];
  facture: Facture = new Facture();

  constructor(private basketService: BasketService, private clientService: ClientService, private authService: AuthService,
              private router: Router, private factureService: FactureService) { }

  ngOnInit() {
    this.loadBasket();

  }

  loadBasket(): void {
    this.basketService.getBasket(this.authService.usuario.username).subscribe( (basket) => this.itemBasket = basket);
  }

  public calculatePrice(itemBasket: ItemBasket): number {
    return (itemBasket.quantity * itemBasket.product.price);
}

  updateQuantity(id1: number, id: number, event: any): void {
    const quantity: number = event.target.value as number;

    this.itemBasket = this.itemBasket.map((item: ItemBasket) => {
      if (id1 === item.id && id === item.product.id) {
      item.quantity = quantity;
      this.basketService.updateItem(item).subscribe( response => {
        this.router.navigate(['/myBasket']);
      });
      }
      return item;
    });
  }

  public caculateTotal(): number {
    let total = 0.00;
    for (const item of this.itemBasket) {
       total = total + this.calculatePrice(item);
    }
    return total;
  }

  sizes(product: Product): string[] {
    return product.size.split(',');
   }

   memories(product: Product): string[] {
     return product.memory.split(',');
    }

    delete(itemBasket: ItemBasket): void {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro/a?',
        text: `¿Va a eliminar ${itemBasket.product.name} de su cesta?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          this.basketService.delete(itemBasket.id).subscribe(
            response => {
              this.itemBasket = this.itemBasket.filter(cli => cli !== itemBasket);
            }
          );
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El producto ha sido eliminado de su cesta',
            'success',
          );
        }
      });
    }

    createFactureUnify(): void {
      this.factureService.createFactureUnify(this.facture, this.authService.usuario.username).subscribe( response => {
        this.router.navigate(['/myFacture']);
       });
    }

    createFacturas(): void {
      this.factureService.createFacture(this.facture, this.authService.usuario.username).subscribe(response => {

      });
    }


}
