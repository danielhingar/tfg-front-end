import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { AuthService } from '../../../../login/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsCompany(this.authService.usuario.username).subscribe(
      products => this.products = products
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

