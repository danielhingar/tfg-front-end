import { Component, OnInit } from '@angular/core';

import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { AuthService } from '../../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  status: string[] = ['EN PROCESO', 'DENEGADA',  'ACEPTADA', 'PENDIENTE DE RESPUESTA'];
  claims: Claim[] = [];
  claims1: Claim[] = [];
  client: string[] = [];
  paginador: any;
  company1 = 'None';
  date: string;
  date1: string;
  state: string;
  opcionSeleccionada1 = '';
  opcionSeleccionada2 = '';
  ids: number[] = [];
  pass: boolean;
  constructor(private claimService: ClaimService, private authService: AuthService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClaims();

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

  search() {
    if (this.date === undefined && this.date1 === undefined) {
      this.claims = [];
      this.claims = this.claims1;
      if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.company1) {
        this.claims = this.claims.filter(res => {
          return res.facture.client.username.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
        });
      }
      if (this.opcionSeleccionada2 !== undefined && this.opcionSeleccionada2 !== this.company1) {
        this.claims = this.claims.filter(res => {
          return res.status.toLocaleUpperCase().match(this.opcionSeleccionada2.toLocaleUpperCase());
        });
      }
    }

    if (this.date !== undefined ) { 
      this.claims = [];
      this.claims = this.claims1.filter(res => {
        const date3 = moment(this.date).format('YYYY-MM-DD');
        const date4 = moment(res.createDate).format('YYYY-MM-DD');
        if (moment(date3).isBefore(date4)) {
          return this.claims.push(res);
        }
      });
      if (this.date1 !== undefined) {
        this.claims = this.claims.filter(res => {
          const date3 = moment(this.date1).format('YYYY-MM-DD');
          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date4).isBefore(date3)) {
            return this.claims.push(res);
          }
        });
      }
      if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.company1) {
        this.claims = this.claims.filter(res => {
          return res.facture.client.username.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
        });
      }
      if (this.opcionSeleccionada2 !== undefined && this.opcionSeleccionada2 !== this.company1) {
        this.claims = this.claims.filter(res => {
          return res.status.toLocaleUpperCase().match(this.opcionSeleccionada2.toLocaleUpperCase());
        });
      }

    }

    if (this.date1 !== undefined ) {

      this.claims = [];
      this.claims = this.claims1.filter(res => {
        const date3 = moment(this.date1).format('YYYY-MM-DD');

        const date4 = moment(res.createDate).format('YYYY-MM-DD');
        if (moment(date4).isBefore(date3)) {
          return this.claims.push(res);
        }
      });
      if (this.date !== undefined) {
        this.claims = this.claims.filter(res => {
          const date3 = moment(this.date).format('YYYY-MM-DD');

          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date3).isBefore(date4)) {
            return this.claims.push(res);
          }
        });
      }
      if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.company1) {
        this.claims = this.claims.filter(res => {
          return res.facture.client.username.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
        });
      }
      if (this.opcionSeleccionada2 !== undefined && this.opcionSeleccionada2 !== this.company1) {
        this.claims = this.claims.filter(res => {
          return res.status.toLocaleUpperCase().match(this.opcionSeleccionada2.toLocaleUpperCase());
        });
      }

    }

  }
  removeDate() {
    this.date = undefined;
  }

  removeDate1() {
    this.date1 = undefined;
  }

  loadClients() {
    for (const claim of this.claims1) {
      if (!this.client.includes(claim.facture.client.username)) {
        this.client.push(claim.facture.client.username);
      }
    }
    return this.client;
  }
}
