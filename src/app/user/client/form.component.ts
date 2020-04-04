import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public client: Client = new Client();
  public errores: string[];


  constructor(private clientService: ClientService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loadClient();

  }


  loadClient(): void {
    const client1 =  this.authService.usuario.username;

    if (client1) {
    this.clientService.getClient(this.authService.usuario.username).subscribe( (client) => this.client = client);
    }
  }

  public create(): void {
    this.clientService.create(this.client).subscribe(
      response => {
        this.router.navigate(['']);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          text: `Nuevo usuario creado con éxito`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
    }
    );
  }

  update(): void {
    this.clientService.update(this.client).subscribe( client => {
      this.router.navigate(['/home/page/0']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Perfil',
        text: `Sus datos han sido actualizados`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }
}
