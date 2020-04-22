import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { AuthService } from '../../../../login/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../company.service';
import { URL_BACKEND } from '../../../../config/config';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

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
    this.loadProducts1();
  }

  loadProducts(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productService.getProductsCompany(page, this.authService.usuario.username).subscribe(
        products => {
          this.products = products.content as Product[];
          this.paginador = products;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      );
    }
    );
  }
  loadProducts1(): void {
  if (this.authService.usuario.username) {
        this.companyService.getCompany(this.authService.usuario.username).subscribe((company) => this.products1 = company.products);
    }
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
  Search() {
    if (this.name !== '') {
      this.products = this.products1.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    } else if (this.name === '') {
      this.ngOnInit();
    }
  }

}

