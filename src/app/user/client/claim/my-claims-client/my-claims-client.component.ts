import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../../reporter/claim/claim.service';
import { Claim } from '../../../reporter/claim/claim';
import { AuthService } from '../../../../login/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-claims-client',
  templateUrl: './my-claims-client.component.html',
  styleUrls: ['./my-claims-client.component.css']
})
export class MyClaimsClientComponent implements OnInit {

  claims: Claim[] = [];
  constructor(private claimService: ClaimService, private authService: AuthService) { }

  ngOnInit() {
    this.loadClaims(this.authService.usuario.username);
  }

  loadClaims(username): void {
    this.claimService.getClaimsClient(username).subscribe(
      claims => this.claims = claims
    );
  }

  delete(claim: Claim): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro/a?',
      text: `¿Vas eliminar la queja ${claim.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.claimService.delete(claim.id).subscribe(
          response => {
            this.claims = this.claims.filter(cli => cli !== claim);
          }
        );
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'La queja ha sido eliminado con éxito',
          'success'
        );
      }
    });
  }
}
