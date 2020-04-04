import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Product } from './product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { AuthService } from '../../../login/auth.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public company: Company = new Company();
  name: string;
  products: Product[] = [];
  products1: Product[] = [];
  paginador: any;
  categories: string[] = [];
  constructor(private companyService: CompanyService, private router: Router,  private activatedRoute: ActivatedRoute,
              private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarProducts1();
    this.cargarProducts();
    this.cargarCompany();

  }
  cargarProducts1(): void {
    this.activatedRoute.params.subscribe(params => {
      const username = params.username;
      if (username) {
        this.companyService.getCompany(username).subscribe( (company) => this.products1 = company.products);
      }
      this.loadCategories();
    });
  }

  cargarProducts(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      const username = params.get('username');
      if (!page) {
        page = 0;
      }
      this.productService.getProductsCompany(page, username).subscribe(
        products => {
          this.products = products.content as Product[];
          this.paginador = products;
        }
      );
    }
    );
  }

  cargarCompany(): void {
    this.activatedRoute.params.subscribe(params => {
      const username = params.username;
      if (username) {
        this.companyService.getCompany(username).subscribe( (company) => this.company = company);
      }
    });
  }

 Search() {
   if (this.name !== '') {
    this.products = this.products1.filter( res => {
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
    for (const product of this.products1) {
      this.categories.push(product.category);
    }
    return this.categories;
  }

}
