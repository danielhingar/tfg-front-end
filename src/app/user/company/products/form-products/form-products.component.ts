import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../login/auth.service';
import { Product } from '../product';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  public product: Product = new Product();
  constructor(private productSevice: ProductService, private router: Router, private activatedRouter: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.productSevice.getProduct(id).subscribe( (product) => this.product = product);
      }
    });
  }


  public create(): void {
    this.productSevice.createProduct(this.product, this.authService.usuario.username).subscribe(
      response => {
        this.router.navigate(['/myProducts']);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto',
          text: `Nueva producto añadido al inventario`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
    }
    );
  }

  update(): void {
    this.productSevice.update(this.product).subscribe( product => {
      this.router.navigate(['/myProducts']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Producto',
        text: `El producto ha sido actualizado`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }



}
