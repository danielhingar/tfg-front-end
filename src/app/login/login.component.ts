import { Component, OnInit } from '@angular/core';
import { Usuario } from '../user/usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { ConfigurationService } from '../user/admin/configuration/configuration.service';
import { Configuration } from '../user/admin/configuration/configuration';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  configuration: Configuration;
  constructor( private authService: AuthService, private router: Router, private configurationSevice: ConfigurationService) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    this.loadConfiguration();
    if (this.authService.isAuthenticated()) {
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Inicio de sesión',
        text: `Usted ya está autenticado/a`,
        showConfirmButton: true,
        width: 350,
      });
      this.router.navigate(['/home']);
    }

  }

  loadConfiguration(): void {
    this.configurationSevice.getConfiguration().subscribe(
      response => this.configuration = response
    );
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error Login',
        text: `Usuario o contraseña vacía`,
        showConfirmButton: true,
        width: 350,
      });
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      const usuario = this.authService.usuario;
      this.router.navigate(['/home']);
      const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        width: 300,
      });

      Toast.fire({
        icon: 'success',
        title: `Bienvenido/a a Showcase`
      });
    }, err => {
      if (err.status === 400 ) {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error Login',
          text: `Usuario o contraseña incorrectas`,
          showConfirmButton: true,
          width: 350,
        });
      }
    }
    );
  }

}
