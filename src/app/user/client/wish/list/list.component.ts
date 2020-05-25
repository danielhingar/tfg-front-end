import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { AuthService } from '../../../../login/auth.service';
import { Client } from '../../client';
import { Product } from '../../../company/products/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[] = [];
  constructor(private clientService: ClientService, private authService: AuthService) { }

  ngOnInit() {
    this.loadClient();

  }

  loadClient(): void {
    const client1 =  this.authService.usuario.username;

    if (client1) {
    this.clientService.getClient(this.authService.usuario.username).subscribe( (client) => this.products = client.wishProducts);
    }
  }


}
