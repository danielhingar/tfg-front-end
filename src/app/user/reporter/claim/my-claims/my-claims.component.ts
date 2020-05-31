import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { Claim } from '../claim';
import { AuthService } from '../../../../login/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
  client: string[] = [];
  company1 = 'None';
  date: string;
  date1: string;
  opcionSeleccionada1 = '';
  opcionSeleccionada2 = '';
  constructor(private claimService: ClaimService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClaims();

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
