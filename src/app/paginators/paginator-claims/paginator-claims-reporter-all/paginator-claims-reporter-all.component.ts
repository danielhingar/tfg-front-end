import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator-claims-reporter-all',
  templateUrl: './paginator-claims-reporter-all.component.html',
})
export class PaginatorClaimsReporterAllComponent implements OnInit, OnChanges {


  @Input() paginador: any;

  paginas: number[];

  desde: number;
  hasta: number;
  constructor(private activatedRoute: ActivatedRoute) { }

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
