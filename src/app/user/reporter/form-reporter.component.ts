import { Component, OnInit } from '@angular/core';
import { Reporter } from './reporter';
import { ReporterService } from './reporter.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-form-reporter',
  templateUrl: './form-reporter.component.html',
  styleUrls: ['./form-reporter.component.css']
})
export class FormReporterComponent implements OnInit {

  public reporter: Reporter = new Reporter();
  public errores: string[];

  constructor(private reporterService: ReporterService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  if (this.authService.hasRole('ROLE_REPORTER')) {
    this.loadReporter();
  }
  }

  loadReporter(): void {
    const reporter1 =  this.authService.usuario.username;

    if (reporter1) {
    this.reporterService.getReporter(this.authService.usuario.username).subscribe( (reporter) => this.reporter = reporter);
    }
  }

  public create(): void {
    this.reporterService.create(this.reporter).subscribe(
      response => {
        this.router.navigate(['/home/page/0']);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          text: `Nuevo intermediario creado con éxito`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
    }
    );
  }

  update(): void {
    this.reporterService.update(this.reporter).subscribe( reporter => {
      this.router.navigate(['/home/page/0']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Intermediario',
        text: `Sus datos han sido actualizados`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }
}
