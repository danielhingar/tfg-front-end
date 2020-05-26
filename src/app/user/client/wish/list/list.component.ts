import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { AuthService } from '../../../../login/auth.service';
import { Client } from '../../client';
import { Product } from '../../../company/products/product';
import { ProductService } from '../../../company/products/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[] = [];
  client: Client = new Client();
  constructor(private clientService: ClientService, private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.loadClient();

  }

  loadClient(): void {
    const client1 =  this.authService.usuario.username;

    if (client1) {
    this.clientService.getClient(this.authService.usuario.username).subscribe( (client) => {
      this.products = client.wishProducts;
      this.client = client;
    }
    );
  }
}

removeWish(product: Product) {
  this.productService.removeWish(this.client, product, this.authService.usuario.username).subscribe(
    response => {
      this.products = this.products.filter(cli => cli !== product);
    }
  );
}
}
