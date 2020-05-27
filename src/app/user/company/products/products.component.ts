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
  priceMax: number;
  category: string;
  category1 = 'None';
  stock: boolean;
  offert: boolean;
  products: Product[] = [];
  products1: Product[] = [];
  wishList: Product[] = [];
  paginador: any;
  categories: string[] = [];
  pass: boolean;
  loading = true;
  client: Client = new Client();
  urlBackend: string = URL_BACKEND;
  constructor(private companyService: CompanyService, private router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService, private authService: AuthService, private clientService: ClientService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadClient();
    this.pass = false;
    this.cargarProducts();
    this.cargarCompany();

  }

  search() {
    if (this.category !== undefined && this.category !== 'None' && this.name !== undefined) {
      this.products = [];
      this.products = this.products1.filter(res => {
        if (res.category.toLocaleUpperCase() === this.category.toLocaleUpperCase() &&
        res.name.toLocaleUpperCase().match(this.name.toLocaleUpperCase())) {
          return this.products.push(res);
        }
      });
    }
    if (this.category !== undefined && this.category !== 'None' && this.name !== undefined && this.offert === true) {
      this.products = [];
      this.products = this.products1.filter(res => {
        if (res.category.toLocaleUpperCase() === this.category.toLocaleUpperCase() &&
        res.name.toLocaleUpperCase().match(this.name.toLocaleUpperCase()) && res.offert) {
          return this.products.push(res);
        }
      });
    }
    if (this.category !== undefined && this.category !== 'None' && this.name === undefined) {
      this.products = [];
      this.products = this.products1.filter( res => {
        return res.category.toLocaleUpperCase().match(this.category.toLocaleUpperCase());
      });
    }
    if (this.name !== undefined && (this.category === 'None' || this.category === undefined)) {
      this.products = [];
      this.products = this.products1.filter( res => {
        return res.name.toLocaleUpperCase().match(this.name.toLocaleUpperCase());
      });
    }
    if ((this.category === 'None' || this.category === undefined) && this.name === undefined && (this.offert === false
      || this.offert === undefined)) {
      this.ngOnInit();
    }
    if (this.offert === true && (this.name === undefined || this.name === '')
    && (this.category === undefined || this.category === 'None')) {
      this.products = [];
      this.products = this.products1.filter(res => {
        if (res.offert) {
          return this.products.push(res);
        }
      });
    }
    if (this.offert === true && (this.name === undefined || this.name === '')
    && this.category !== undefined && this.category !== 'None') {
      this.products = [];
      this.products = this.products1.filter(res => {
        if (res.offert && res.category.toLocaleUpperCase() === this.category.toLocaleUpperCase()) {
          return this.products.push(res);
        }
      });
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

