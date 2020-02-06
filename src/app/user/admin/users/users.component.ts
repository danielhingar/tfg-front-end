import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Usuario } from '../../usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  clients: Usuario[];
  companies: Usuario[];
  reporters: Usuario[];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getClients().subscribe(
      users => this.clients = users
    );

    this.adminService.getCompanies().subscribe(
      users => this.companies = users
    );

    this.adminService.getReporters().subscribe(
      users => this.reporters = users
    );
  }


  disable(usuario: Usuario): void {
    this.adminService.disable(usuario.id).subscribe(
      response => {
        this.router.navigate(['/home']);
        swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Administrador',
          text: `Perfil deshabilitado`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
      }
    );
  }

  enable(usuario: Usuario): void {
    this.adminService.enable(usuario.id).subscribe(
      response => {
        this.router.navigate(['/home']);
        swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Administrador',
          text: `Perfil habilitado`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
      }
    );
  }
}
