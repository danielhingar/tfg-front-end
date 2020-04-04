import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import { CompanyService } from '../../user/company/company.service';
import { Company } from '../../user/company/company';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator-products',
  templateUrl: './paginator-products.component.html',
  styleUrls: ['./paginator-products.component.css']
})
export class PaginatorProductsComponent implements OnInit, OnChanges {

  @Input() paginador: any;

  paginas: number[];

  desde: number;
  hasta: number;
  company: Company;
  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }


  ngOnChanges() {
    this.desde = Math.min(Math.max(1, this.paginador.number - 4 ), this.paginador.totalPages - 5 );
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);
    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
