import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../shipping.service';
import { Shipping } from '../shipping';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detail-shipping',
  templateUrl: './detail-shipping.component.html',
  styleUrls: ['./detail-shipping.component.css']
})
export class DetailShippingComponent implements OnInit {

  shipping: Shipping = new Shipping();
  constructor(private shippingService: ShippingService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadShipping();

  }

  loadShipping(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.shippingService.getShipping(id).subscribe( (shipping) => this.shipping = shipping);
      }
    });
  }

  public create(): void {
    this.shippingService.createShipping(this.shipping).subscribe(
      response => {
        this.router.navigate(['/shippings']);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Admin',
          text: `Nueva método de envío añadido`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
    }
    );
  }

  update(): void {
    this.shippingService.update(this.shipping).subscribe( product => {
      this.router.navigate(['/shippings']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Admin',
        text: `El método de envío ha sido actualizado`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }

}
