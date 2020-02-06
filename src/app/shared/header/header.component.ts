import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { Client } from '../../user/client/client';
import { ClientService } from '../../user/client/client.service';
import { BasketService } from '../../user/client/basket/basket.service';
import { ItemBasket } from '../../user/client/basket/itemBasket';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  itemBasket: ItemBasket[] = [];

  constructor(public authService: AuthService, private router: Router, private basketService: BasketService) { }

  ngOnInit() {

    if (this.authService.hasRole('ROLE_CLIENT')) {
      this.loadBasket();
    }


  }

  loadBasket(): void {
    this.basketService.getBasket(this.authService.usuario.username).subscribe( (basket) => this.itemBasket = basket);
  }

  count(): number {
    let total = 0;
    for ( const item of this.itemBasket) {
      total = total + item.quantity;
    }
    return total;
  }

  logout(): void {
    this.authService.logout();
    const Toast = swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: false,
      width: 300,
    });

    Toast.fire({
      icon: 'success',
      title: `Has cerrado sesión, esperamos que vuelva pronto`
    });
    this.router.navigate(['']);
  }

}
