import { Component, OnInit } from '@angular/core';
import { Company } from '../user/company/company';
import { CompanyService } from '../user/company/company.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Configuration } from '../user/admin/configuration/configuration';
import { ConfigurationService } from '../user/admin/configuration/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companies: Company[];
  businessName: string;

  constructor(private companyService: CompanyService, private router: Router,  private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit() {


    this.companyService.getCompanies().subscribe(
       companies => this.companies = companies
     );

  }


  Search() {
    if (this.businessName !== '') {
     this.companies = this.companies.filter( res => {
       return res.businessName.toLocaleLowerCase().match(this.businessName.toLocaleLowerCase());
     });
    } else if (this.businessName === '') {
      this.ngOnInit();
    }
  }

}
