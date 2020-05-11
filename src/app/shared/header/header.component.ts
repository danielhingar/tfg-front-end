import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { BasketService } from '../../user/client/basket/basket.service';
import { ItemBasket } from '../../user/client/basket/itemBasket';
import { ConfigurationService } from '../../user/admin/configuration/configuration.service';
import { Configuration } from '../../user/admin/configuration/configuration';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  itemBasket: ItemBasket[] = [];
  configuration: Configuration;
  constructor(public authService: AuthService, private router: Router, private basketService: BasketService,
              private configurationSevice: ConfigurationService) { }

  ngOnInit() {

    this.loadConfiguration();


  }

  loadConfiguration(): void {
    this.configurationSevice.getConfiguration().subscribe(
      response => this.configuration = response
    );
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
