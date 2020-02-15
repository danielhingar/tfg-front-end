import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Product } from '../product';
import { BasketService } from '../../../client/basket/basket.service';
import { AuthService } from '../../../../login/auth.service';
import { Basket } from 'src/app/user/client/basket/basket';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: Product = new Product();
  public basket: Basket = new Basket();
  opcionSeleccionada = 'null';
  opcionSeleccionada1 = 'null';
  urlEndPoint = 'http://localhost:8080/client/basket';
  url: string;
  constructor(private productService: ProductService,  private router: Router, private activatedRouter: ActivatedRoute,
              private basketService: BasketService, public authSevice: AuthService, private http: HttpClient,
              @Inject(DOCUMENT) document: any) { }

  ngOnInit() {
    this.loadProduct();
    if (this.authSevice.hasRole('ROLE_CLIENT')) {
    this.loadBasket();
    }
    this.url = document.location.href;

  }

  loadProduct(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.productService.getProduct(id).subscribe( (product) => this.product = product);
      }
    });
  }
  rebaja(product: Product): number {
    return product.price - (product.price * (product.offert / 100));
  }

  sizes(product: Product): string[] {
   return product.size.split(',');
  }

  memories(product: Product): string[] {
    return product.memory.split(',');
   }

  loadBasket(): void {
    const client1 =  this.authSevice.usuario.username;

    if (client1) {
    this.productService.getBasket(this.authSevice.usuario.username).subscribe( (basket) => this.basket = basket);
    }
  }

  update(): void {

      this.basketService.addProductToBasket(this.basket, this.authSevice.usuario.username,
        this.product.id, this.opcionSeleccionada , this.opcionSeleccionada1).subscribe( response => {
         this.router.navigate(['/myBasket']);
       });
    }

}
