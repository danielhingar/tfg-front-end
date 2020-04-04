import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { AuthService } from '../../../../login/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  products: Product[];
  paginador: any;
  constructor(private productService: ProductService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadProducts();
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

}

