import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Company } from './company';
import { CompanyService } from './company.service';
import { AuthService } from '../../login/auth.service';
import { HttpEventType } from '@angular/common/http';
import { URL_BACKEND } from '../../config/config';


@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {

  public company: Company = new Company();
  public errores: string[];
  public fotoSeleccionada: File;
  progreso = 0;
  urlBackend: string = URL_BACKEND;
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
        this.router.navigate(['/home/page/0']);
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
      this.router.navigate(['/home/page/0']);
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

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Compañía',
        text: `El archivo seleccionado no es una imagen`,
        showConfirmButton: false,
        width: 350,
        timer: 1400,
      });
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Producto',
        text: `Debe seleccionar una foto`,
        showConfirmButton: false,
        width: 350,
        timer: 1400,
      });
    } else {
    this.companyService.uploadPhoto(this.fotoSeleccionada, this.company.id).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          const response: any = event.body;
          this.company = response.company as Company;
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compañía',
            text: `Se ha subido correctamente la imagen`,
            showConfirmButton: false,
            width: 350,
            timer: 1400,
          });
        }

      }
    );
  }
  }
}
