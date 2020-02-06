import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Company } from './company';
import { CompanyService } from './company.service';
import { AuthService } from '../../login/auth.service';


@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {

  public company: Company = new Company();
  public errores: string[];

  constructor(private companyService: CompanyService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.hasRole('ROLE_COMPANY')) {
    this.loadCompany();
  }
  }

  loadCompany(): void {
    const company1 =  this.authService.usuario.username;

    if (company1) {
    this.companyService.getCompany(this.authService.usuario.username).subscribe( (company) => this.company = company);
    }
  }

  public create(): void {
    this.companyService.create(this.company).subscribe(
      response => {
        this.router.navigate(['/home']);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          text: `Nueva compañía creada con éxito`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
    }
    );
  }

  update(): void {
    this.companyService.update(this.company).subscribe( company => {
      this.router.navigate(['/home']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Compañía',
        text: `Sus datos han sido actualizados`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }
}
