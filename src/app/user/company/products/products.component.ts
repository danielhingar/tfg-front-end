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



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public company: Company = new Company();
  name: string;
  category: string;
  products: Product[] = [];
  products1: Product[] = [];
  paginador: any;
  categories: string[] = [];
  pass: boolean;
  loading = true;
  wishList: Product[] = [];
  urlBackend: string = URL_BACKEND;
  constructor(private companyService: CompanyService, private router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService, private authService: AuthService, private clientService: ClientService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadClient();
    console.log(this.wishList);
    this.pass = false;
    this.cargarProducts();
    this.cargarCompany();

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

  Search() {
    if (this.category !== '' && this.name !== '' && this.category !== undefined) {
      this.pass = true;
      this.products = [];
      this.products = this.products1.filter(res1 => {
        if (res1.category.toLocaleUpperCase() === this.category.toLocaleUpperCase()
         && res1.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())) {
          return this.products.push(res1);
        }
      });
    }
    if (this.name !== '' && (this.category === '' || this.category === undefined)) {
      this.pass = true;
      this.products = this.products1.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });

    } else if (this.name === '') {
      this.ngOnInit();
    }
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

  SearchCategory(category1) {
    this.category = category1;
    if (this.category !== '') {
      this.pass = true;
      this.products = this.products1.filter(res => {
        return res.category.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      });
      } else if (this.category === '') {
        this.ngOnInit();
      }

    }

  cleanFilter() {
      this.name = '';
      this.category = '';
      this.pass = false;
      this.cargarProducts();
    }

  igual(category1): boolean {
      if (this.category === category1) {
        return true;
      } else {
        return false;
      }
    }

    loadClient(): void {
      const client1 =  this.authService.usuario.username;

      if (client1) {
      this.clientService.getClient(this.authService.usuario.username).subscribe( (client) => this.wishList = client.wishProducts);
      }
    }

  like(product: Product): boolean {
    if (this.wishList.includes(product)) {
      return true;
    } else {
      return false;
    }
  }

  dislike(product: Product): boolean {
    if (!(this.wishList.includes(product))) {
      return true;
    } else {
      return false;
    }
  }

  openSnackBar(message, action) {
   const snackBarRef = this.snackBar.open(message, action, {duration: 4000});
   snackBarRef.onAction().subscribe(() => {
    this.router.navigate(['wishList']);
  });
  }
  addWish(product: Product) {
    this.productService.addWish(product, this.authService.usuario.username).subscribe(
      response => {
        this.wishList.push(response);
      }
    );
  }
  }

