import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../login/auth.service';
import { Product } from '../product';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { URL_BACKEND } from '../../../../config/config';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  public product: Product = new Product();
  public fotoSeleccionada: File;
  progreso = 0;
  urlBackend: string = URL_BACKEND;
  categories: string[] = ['ALIMENTACIÓN', 'INFORMÁTICA Y ELECTRÓNICA', 'ELECTRODOMÉSTICOS', 'HOGAR Y DECORACIÓN', 'DEPORTES', 'JUGUETES',
   'VIDEOJUEGOS', 'PERFUMERÍA Y PARAFARMACIA', 'JOYERÍA', 'LIBROS', ' CINE Y MÚSICA', 'EQUIPAJE', 'MASCOTAS', 'MODA', 'TELEFONÍA'];
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
        this.router.navigate(['/myProducts/page/0']);
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
      this.router.navigate(['/myProducts/page/0']);
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

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Producto',
        text: `El archivo seleccionado no es una imagen`,
        showConfirmButton: false,
        width: 350,
        timer: 1400,
      });
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Producto',
        text: `Debe seleccionar una foto`,
        showConfirmButton: false,
        width: 350,
        timer: 1400,
      });
    } else {
    this.productSevice.uploadPhoto(this.fotoSeleccionada, this.product.id).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          const response: any = event.body;
          this.product = response.product as Product;
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto',
            text: `Se ha subido correctamente la imagen`,
            showConfirmButton: false,
            width: 350,
            timer: 1400,
          });
        }

      }
    );
  }
  }


}
