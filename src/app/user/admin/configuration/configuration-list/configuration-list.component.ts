import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { Configuration } from '../configuration';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {


  configuration: Configuration;
  constructor(private configurationService: ConfigurationService, private router: Router) { }

  ngOnInit() {
    this.loadConfiguration();
  }

  loadConfiguration(): void {
    this.configurationService.getConfiguration().subscribe(
      response => this.configuration = response
    );
  }

  update(): void {
    this.configurationService.update(this.configuration).subscribe( product => {
      this.router.navigate(['/configuration']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Admin',
        text: `Los parámetros han sido actualizados`,
        showConfirmButton: false,
        width: 350,
        timer: 2000,
      });
    });
  }

}
