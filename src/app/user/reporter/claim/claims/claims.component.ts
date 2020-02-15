import { Component, OnInit } from '@angular/core';

import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { AuthService } from '../../../../login/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  claims: Claim[] = [];
  constructor(private claimService: ClaimService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getClaims().subscribe(
      claims => this.claims = claims
    );
  }

  assign(claim: Claim): void {
    this.claimService.assign(claim, claim.id, this.authService.usuario.username).subscribe(
      response => {
        this.router.navigate(['/myClaims']);
        swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Intermediario',
          text: `Se ha asignado la queja a su cuenta`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
      }
    );
  }

}
