import { Component, OnInit } from '@angular/core';

import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { AuthService } from '../../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  status: string[] = ['EN PROCESO', 'DENEGADA',  'ACEPTADA', 'PENDIENTE DE RESPUESTA'];
  claims: Claim[] = [];
  claims1: Claim[] = [];
  paginador: any;
  state: string;
  opcionSeleccionada1 = '';
  ids: number[] = [];
  pass: boolean;
  constructor(private claimService: ClaimService, private authService: AuthService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClaims();
    this.pass = false;
  }

  loadClaims(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.claimService.getClaims(page).subscribe(
        claims => {
          this.claims = claims.content as Claim[];
          this.claims1 = claims.content as Claim[];
          this.paginador = claims;
        }
      );
    }
    );
  }

  assign(claim: Claim): void {
    this.claimService.assign(claim, claim.id, this.authService.usuario.username).subscribe(
      response => {
        this.router.navigate(['/myClaims/page/0']);
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

  SearchStatus(state1) {
    this.opcionSeleccionada1 = '';
    this.state = state1;
    if (this.state !== '') {
      this.pass = true;
      this.claims = this.claims1.filter(res => {
        return res.status.toLocaleLowerCase().match(this.state.toLocaleLowerCase());
      });
      } else if (this.state === '') {
        this.ngOnInit();
      }

    }

    igual(state1): boolean {
      if (this.state === state1) {
        return true;
      } else {
        return false;
      }
    }

    cleanFilter() {
      this.loadClaims();
      this.pass = false;
    }
}
