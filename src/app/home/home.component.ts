import { Component, OnInit } from '@angular/core';
import { Company } from '../user/company/company';
import { CompanyService } from '../user/company/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  companies: Company[];
  businessName: string;
  paginador: any;
  companies1: Company[];
  constructor(private companyService: CompanyService, private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.companyService.getCompanies(page).subscribe(
        companies => {
          this.companies = companies.content as Company[];
          this.paginador = companies;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      );
    }
    );
    this.getCompanies1();
  }


  getCompanies1() {
    this.companyService.getCompanies1().subscribe( (company) => this.companies1 = company);
  }

  Search() {
    if (this.businessName !== '') {
      this.companies = this.companies1.filter(res => {
        return res.businessName.toLocaleLowerCase().match(this.businessName.toLocaleLowerCase());
      });
    } else if (this.businessName === '') {
      this.ngOnInit();
    }
  }

}
