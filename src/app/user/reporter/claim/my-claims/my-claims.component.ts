import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { Claim } from '../claim';
import { AuthService } from '../../../../login/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.css']
})
export class MyClaimsComponent implements OnInit {

  status: string[] = ['EN PROCESO', 'DENEGADA',  'ACEPTADA', 'PENDIENTE DE RESPUESTA'];
  claims: Claim[] = [];
  claims1: Claim[] = [];
  paginador: any;
  state: string;
  pass: boolean;
  opcionSeleccionada1 = '';
  constructor(private claimService: ClaimService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

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
      this.claimService.getClaimsReporter(this.authService.usuario.username, page).subscribe(
        claims => {
          this.claims = claims.content as Claim[];
          this.claims1 = claims.content as Claim[];
          this.paginador = claims;
        }
      );
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
