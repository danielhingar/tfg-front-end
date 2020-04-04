import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../user/admin/configuration/configuration.service';
import { Configuration } from 'src/app/user/admin/configuration/configuration';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number = new Date().getFullYear();
  configuration: Configuration;
  address = null;
  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {

    this.loadConfiguration();

    }

  loadConfiguration(): void {
    this.configurationService.getConfiguration().subscribe(
    response => this.configuration = response
    );
    }
}
