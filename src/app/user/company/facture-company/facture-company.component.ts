import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { AuthService } from '../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import * as moment from 'moment';

@Component({
  selector: 'app-facture-company',
  templateUrl: './facture-company.component.html',
  styleUrls: ['./facture-company.component.css']
})
export class FactureCompanyComponent implements OnInit {

  factures: Facture[] = [];
  factures1: Facture[] = [];
  paginador: any;
  date: string;
  date1: string;
  id: number = null;
  constructor(private factureService: FactureService, private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFactures(this.authService.usuario.username);
  }

  loadFactures(username): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.factureService.getFacturesCompany(page, this.authService.usuario.username).subscribe(
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
    for (const item of facture.itemBaskets) {
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

  search() {
    if (this.date === undefined && this.date1 === undefined) {
      this.factures = [];
      this.factures = this.factures1;
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

    }

  }
  removeDate() {
    this.date = undefined;
  }

  removeDate1() {
    this.date1 = undefined;
  }

}
