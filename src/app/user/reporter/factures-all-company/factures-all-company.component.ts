import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../client/facture/facture.service';
import { Facture } from '../../client/facture/facture';
import { ItemBasket } from '../../client/basket/itemBasket';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-factures-all-company',
  templateUrl: './factures-all-company.component.html',
  styleUrls: ['./factures-all-company.component.css']
})
export class FacturesAllCompanyComponent implements OnInit {

  opcionSeleccionada1 = '';
  status: string[] = ['PAGADA', 'PENDIENTE DE PAGO'];
  factures: Facture[] = [];
  factures1: Facture[] = [];
  paginador: any;
  state: string;
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

  searchCompany( event: any): void {
    const company: string = event.target.value as string;
    if (this.state !== '' && company !== '' && this.state !== undefined) {
      this.pass = true;
      this.factures = [];
      this.factures = this.factures1.filter(res1 => {
        if (res1.status.toLocaleUpperCase() === this.state.toLocaleUpperCase()
         && res1.company.businessName.toLocaleUpperCase() === company.toLocaleUpperCase()) {
          return this.factures.push(res1);
        }
      });
    }
    if (company !== '' && (this.state  === '' || this.state === undefined)) {
      this.pass = true;
      this.factures = this.factures1.filter(res => {
        return res.company.businessName.toLocaleLowerCase().match(company.toLocaleLowerCase());
      });
    } else if (company === '') {
        this.ngOnInit();
      }
    }

    cleanFilter() {
      this.state = '';
      this.pass = false;
      this.loadFactures();
    }
}
