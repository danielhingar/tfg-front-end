import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { About } from '../about';
import { AuthService } from '../../../../login/auth.service';
import { AboutService } from '../about.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css']
})
export class AboutFormComponent implements OnInit {

  about: About = new About();
  constructor(private companyService: CompanyService, private authService: AuthService, private aboutService: AboutService,
              private router: Router ) { }

  ngOnInit() {
    this.cargarAbout();
    console.log(this.about);
  }

  cargarAbout(): void {
      if (this.authService.usuario.username) {
        this.companyService.getCompany(this.authService.usuario.username).subscribe( (company) => this.about = company.about
        );
      }
  }

  update(): void {
    this.aboutService.update(this.about).subscribe( product => {
      this.router.navigate(['/home/page/0']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Compañía',
        text: `Su información ha sido actualizada`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }


}
