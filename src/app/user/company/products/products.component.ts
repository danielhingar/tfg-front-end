import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Product } from './product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { AuthService } from '../../../login/auth.service';
import { URL_BACKEND } from '../../../config/config';
import { ClientService } from '../../client/client.service';
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material';
import { Client } from '../../client/client';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public company: Company = new Company();
  name: string;
  priceMin: number;
  priceMin1: number;
  priceMax: number;
  category: string;
  category1 = 'None';
  priceMax1: number;
  stock: boolean;
  offert: boolean;
  products: Product[] = [];
  products1: Product[] = [];
  products2: Product[] = [];
  wishList: Product[] = [];
  paginador: any;
  categories: string[] = [];
  pass: boolean;
  loading = true;
  client: Client = new Client();
  urlBackend: string = URL_BACKEND;
  constructor(private companyService: CompanyService, private router: Router, private activatedRoute: ActivatedRoute,
    private productService: ProductService, public authService: AuthService, private clientService: ClientService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authService.hasRole('ROLE_CLIENT')){
    this.loadClient();
    }
    this.pass = false;
    this.cargarProducts();
    this.cargarCompany();
    this.loadPriceMin();
    this.loadPriceMax();

  }

  search() {
    if (this.name !== undefined ) {
      this.products = [];
      this.products = this.products1.filter(res => {
        return res.name.toLocaleUpperCase().match(this.name.toLocaleUpperCase());
      });
      if (this.category !== undefined && this.category !== this.category1) {
        this.products = this.products.filter(res => {
          return res.category.toLocaleUpperCase().match(this.category.toLocaleUpperCase());
        });
      }
      if (this.offert === true) {
        this.products = this.products.filter(res => {
          if ( res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.stock === true) {
        this.products = this.products.filter(res => {
          if ( +res.stock !== 0) {
            return this.products.push(res);
          }
        });
      }
      if (this.priceMin !== undefined && this.priceMin !== 1) {
        this.products = this.products.filter(res => {
          if (res.offert && this.rebaja(res) > this.priceMin) {
            return this.products.push(res);
          }
          if (res.price > this.priceMin && !res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.priceMax !== undefined && this.priceMax !== this.priceMin) {
        this.products = this.products.filter(res => {
          if (res.offert && this.rebaja(res) < this.priceMax) {
            return this.products.push(res);
          }
          if (res.price < this.priceMax && !res.offert) {
            return this.products.push(res);
          }
        });
      }
    }
    if (this.name === undefined ) {
      this.products = [];
      this.name = '';
      this.products = this.products1.filter(res => {
        return res.name.toLocaleUpperCase().match(this.name.toLocaleUpperCase());
      });
      if (this.category !== undefined && this.category !== this.category1) {
        this.products = this.products.filter(res => {
          return res.category.toLocaleUpperCase().match(this.category.toLocaleUpperCase());
        });
      }
      if (this.offert === true) {
        this.products = this.products.filter(res => {
          if ( res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.stock === true) {
        this.products = this.products.filter(res => {
          if ( +res.stock !== 0) {
            return this.products.push(res);
          }
        });
      }
      if (this.priceMin !== undefined && this.priceMin !== 1) {
        this.products = this.products.filter(res => {
          if (res.offert && this.rebaja(res) > this.priceMin) {
            return this.products.push(res);
          }
          if (res.price > this.priceMin && !res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.priceMax !== undefined && this.priceMax !== this.priceMin) {
        this.products = this.products.filter(res => {
          if (res.offert && this.rebaja(res) < this.priceMax) {
            return this.products.push(res);
          }
          if (res.price < this.priceMax && !res.offert) {
            return this.products.push(res);
          }
        });
      }
    }
  }


  cargarProducts(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      const username = params.get('username');
      if (!page) {
        page = 0;
      }
      this.productService.getProductsClient(page, username).subscribe(
        products => {
          this.products = products.content as Product[];
          this.products1 = products.content as Product[];
          this.products2 = products.content as Product[];
          this.paginador = products;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      );
    }
    );
  }

  cargarCompany(): void {
    this.activatedRoute.params.subscribe(params => {
      const username = params.username;
      if (username) {
        this.companyService.getCompany(username).subscribe((company) => this.company = company);
      }
    });
  }

  rebaja(product: Product): number {
    return product.price - (product.price * (product.offert / 100));
  }

  loadCategories() {
    for (const product of this.products) {
      if (!this.categories.includes(product.category)) {
        this.categories.push(product.category);
      }
    }
    return this.categories;
  }

  loadPriceMin() {
    for (const product of this.products) {
      if (this.priceMin1 > product.price) {
        this.priceMin1 = this.priceMin1;
      }
      if (this.priceMin1 < product.price) {
        this.priceMin1 = product.price;
      }

    }
    return this.priceMin1;
  }

  loadPriceMax() {
    for (const product of this.products) {
      if (this.priceMin1 > product.price) {
        this.priceMin1 = this.priceMin1;
      }
      if (this.priceMin1 < product.price) {
        this.priceMin1 = product.price;
      }

    }
    return this.priceMax1 + 20;
  }



  cleanFilter() {
    this.name = '';
    this.category = '';
    this.pass = false;
    this.cargarProducts();
  }


  loadClient(): void {

    this.clientService.getClient(this.authService.usuario.username).subscribe((client) => this.client = client);

  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }



  openSnackBar(message, action) {
    const snackBarRef = this.snackBar.open(message, action, { duration: 4000 });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['wishList']);
    });
  }

  addWish(product: Product) {
    this.productService.addWish(this.client, product, this.authService.usuario.username).subscribe(
      response => {

      }
    );
  }

  productLikes(product: Product): boolean {
    if (!(this.client.wishProducts.find(x => x.id === product.id))) {
      return true;
    } else {
      return false;
    }
  }

  productNoLikes(product: Product): boolean {
    if ((this.client.wishProducts.find(x => x.id === product.id))) {
      return true;
    } else {
      return false;
    }
  }
}

