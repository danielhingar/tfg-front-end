import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { AuthService } from '../../../../login/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../company.service';
import { URL_BACKEND } from '../../../../config/config';
import * as moment from 'moment';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  category: string;
  category1 = 'None';
  categories: string[] = [];
  stock: boolean;
  offert: boolean;
  date: string;
  products: Product[];
  products1: Product[];
  paginador: any;
  name: string;
  loading = true;
  urlBackend: string = URL_BACKEND;


  constructor(private productService: ProductService, private authService: AuthService, private activatedRoute: ActivatedRoute,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.loadProducts();

    this.loadCategories();

  }

  loadProducts(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productService.getProductsCompany(page, this.authService.usuario.username).subscribe(
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


  delete(product: Product): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro/a?',
      text: `¿Vas eliminar ${product.name} de su catálogo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.productService.delete(product.id).subscribe(
          response => {
            this.products = this.products.filter(cli => cli !== product);
          }
        );
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El producto ha sido eliminado con éxito',
          'success'
        );
      }
    });
  }
  search() {

    if (this.name !== undefined) {
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
          if (res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.stock === true) {
        this.products = this.products.filter(res => {
          if (+res.stock !== 0) {
            return this.products.push(res);
          }
        });
      }
      if (this.date !== undefined) {
        this.products = this.products.filter(res => {
          const date3 = moment(this.date).format('YYYY-MM-DD');

          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date3).isBefore(date4)) {
              return this.products.push(res);
            }
        });
      }
    }
    if (this.name === undefined && this.date === undefined) {

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
          if (res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.stock === true) {
        this.products = this.products.filter(res => {
          if (+res.stock !== 0) {
            return this.products.push(res);
          }
        });
      }

    }

    if (this.date !== undefined && this.name === undefined) {
      this.products = [];
      this.products = this.products1.filter(res => {
        const date3 = moment(this.date).format('YYYY-MM-DD');

        const date4 = moment(res.createDate).format('YYYY-MM-DD');
        if (moment(date3).isBefore(date4)) {
            return this.products.push(res);
          }
      });
      if (this.name !== undefined) {
        this.products = [];
        this.products = this.products.filter(res => {
          return res.name.toLocaleUpperCase().match(this.name.toLocaleUpperCase());
        });
      }
      if (this.category !== undefined && this.category !== this.category1) {
        this.products = this.products.filter(res => {
          return res.category.toLocaleUpperCase().match(this.category.toLocaleUpperCase());
        });
      }
      if (this.offert === true) {
        this.products = this.products.filter(res => {
          if (res.offert) {
            return this.products.push(res);
          }
        });
      }
      if (this.stock === true) {
        this.products = this.products.filter(res => {
          if (+res.stock !== 0) {
            return this.products.push(res);
          }
        });
      }
    }

  }

  loadCategories() {
    for (const product of this.products) {
      if (!this.categories.includes(product.category)) {
        this.categories.push(product.category);
      }
    }
    return this.categories;
  }

  removeDate(){
    this.date = undefined;
  }

}

