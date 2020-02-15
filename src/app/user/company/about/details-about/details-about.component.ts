import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from '../../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { About } from '../about';
import { Company } from '../../company';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-details-about',
  templateUrl: './details-about.component.html',
  styleUrls: ['./details-about.component.css']
})
export class DetailsAboutComponent implements OnInit {

  about: About = new About();
  company: Company;
  constructor(@Inject(DOCUMENT) document: any, private companyService: CompanyService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarAbout();
    this.cargarCompany();
  }

  cargarAbout(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.companyService.getCompanyId(id).subscribe( (company) => this.about = company.about
        );
      }
    });
  }

  cargarCompany(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.companyService.getCompanyId(id).subscribe( (company) => this.company = company
        );
      }
    });
  }

}
