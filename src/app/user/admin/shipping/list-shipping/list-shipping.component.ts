import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../shipping.service';
import { Shipping } from '../shipping';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-shipping',
  templateUrl: './list-shipping.component.html',
  styleUrls: ['./list-shipping.component.css']
})
export class ListShippingComponent implements OnInit {

  shippings: Shipping[] = [];
  loading = true;
  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
    this.loadClaims();
  }

  loadClaims(): void {
    this.shippingService.getShippings().subscribe(
      shippings => this.shippings = shippings
    );
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  delete(shipping: Shipping): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro/a?',
      text: `¿Vas eliminar el método ${shipping.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.shippingService.delete(shipping.id).subscribe(
          response => {
            this.shippings = this.shippings.filter(cli => cli !== shipping);
          }
        );
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El método de envío ha sido eliminado con éxito',
          'success'
        );
      }
    });
  }

}
