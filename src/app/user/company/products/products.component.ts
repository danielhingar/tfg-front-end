import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Product } from './product';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public company: Company = new Company();
  name: string;
  products: Product[] = [];
  constructor(private companyService: CompanyService, private router: Router,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarProducts();
    this.cargarCompany();

  }

  cargarProducts(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.companyService.getCompanyId(id).subscribe( (company) => this.products = company.products);
      }
    });
  }

  cargarCompany(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.companyService.getCompanyId(id).subscribe( (company) => this.company = company);
      }
    });
  }

 Search() {
   if (this.name !== '') {
    this.products = this.products.filter( res => {
      return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
    });
   } else if (this.name === '') {
      this.ngOnInit();
    }

  }

  rebaja(product: Product): number {
    return product.price - (product.price * (product.offert / 100));
  }

}
