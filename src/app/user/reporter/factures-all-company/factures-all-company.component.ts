import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-factures-all-company',
  templateUrl: './factures-all-company.component.html',
  styleUrls: ['./factures-all-company.component.css']
})
export class FacturesAllCompanyComponent implements OnInit {

  opcionSeleccionada1 = '';
  opcionSeleccionada2 = '';
  status: string[] = ['PAGADA', 'PENDIENTE DE PAGO'];
  factures: Facture[] = [];
  factures1: Facture[] = [];
  paginador: any;
  state: string;
  company1 = 'None';
  date: string;
  date1: string;
  companies: string[] = [];
  pass: boolean;
  constructor(private factureService: FactureService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFactures();
    this.pass = false;
  }

  loadFactures(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.factureService.getFacturesAllCompany(page).subscribe(
        factures => {
          this.factures = factures.content as Facture[];
          this.factures1 = factures.content as Facture[];
          this.paginador = factures;
        }
      );
    }
    );
  }

  count(facture: Facture): number {
      let total = 0;
      for ( const item of facture.itemBaskets) {
      total = total + item.quantity;
    }
      return total;
  }

  public calculatePrice(itemBasket: ItemBasket): number {
    return (itemBasket.quantity * itemBasket.product.price);
  }

  public caculateTotal(facture: Facture): number {
    let total = 0.00;
    for (const item of facture.itemBaskets) {
      total = total + this.calculatePrice(item);
    }
    return total;
  }

  payCompany(facture: Facture): void {
    this.factureService.payCompany(facture).subscribe(
      response => {
        facture.status = 'PAGADA';
      }
    );
  }

  SearchStatus(state1) {
    this.opcionSeleccionada1 = '';
    this.state = state1;
    if (this.state !== '') {
      this.pass = true;
      this.factures = this.factures1.filter(res => {
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

  loadCompanies() {
    for (const facture of this.factures1) {
      if (!this.companies.includes(facture.company.businessName)) {
        this.companies.push(facture.company.businessName);
      }
    }
    return this.companies;
  }


    search() {
      if (this.date === undefined && this.date1 === undefined) {
        this.factures = [];
        this.factures = this.factures1;
        if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.company1) {
          this.factures = this.factures.filter(res => {
            return res.company.businessName.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
          });
        }
        if (this.opcionSeleccionada2 !== undefined && this.opcionSeleccionada2 !== this.company1) {
          this.factures = this.factures.filter(res => {
            return res.status.toLocaleUpperCase().match(this.opcionSeleccionada2.toLocaleUpperCase());
          });
        }
      }

      if (this.date !== undefined ) { 
        this.factures = [];
        this.factures = this.factures1.filter(res => {
          const date3 = moment(this.date).format('YYYY-MM-DD');
          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date3).isBefore(date4)) {
            return this.factures.push(res);
          }
        });
        if (this.date1 !== undefined) {
          this.factures = this.factures.filter(res => {
            const date3 = moment(this.date1).format('YYYY-MM-DD');
            const date4 = moment(res.createDate).format('YYYY-MM-DD');
            if (moment(date4).isBefore(date3)) {
              return this.factures.push(res);
            }
          });
        }
        if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.company1) {
          this.factures = this.factures.filter(res => {
            return res.company.businessName.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
          });
        }
        if (this.opcionSeleccionada2 !== undefined && this.opcionSeleccionada2 !== this.company1) {
          this.factures = this.factures.filter(res => {
            return res.status.toLocaleUpperCase().match(this.opcionSeleccionada2.toLocaleUpperCase());
          });
        }

      }

      if (this.date1 !== undefined ) {

        this.factures = [];
        this.factures = this.factures1.filter(res => {
          const date3 = moment(this.date1).format('YYYY-MM-DD');
  
          const date4 = moment(res.createDate).format('YYYY-MM-DD');
          if (moment(date4).isBefore(date3)) {
            return this.factures.push(res);
          }
        });
        if (this.date !== undefined) {
          this.factures = this.factures.filter(res => {
            const date3 = moment(this.date).format('YYYY-MM-DD');

            const date4 = moment(res.createDate).format('YYYY-MM-DD');
            if (moment(date3).isBefore(date4)) {
              return this.factures.push(res);
            }
          });
        }
        if (this.opcionSeleccionada1 !== undefined && this.opcionSeleccionada1 !== this.company1) {
          this.factures = this.factures.filter(res => {
            return res.company.businessName.toLocaleUpperCase().match(this.opcionSeleccionada1.toLocaleUpperCase());
          });
        }
        if (this.opcionSeleccionada2 !== undefined && this.opcionSeleccionada2 !== this.company1) {
          this.factures = this.factures.filter(res => {
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
}
