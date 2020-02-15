import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './user/admin/configuration/configuration.service';
import { Configuration } from './user/admin/configuration/configuration';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tfg';

configuration: Configuration;

constructor(private configurationSevice: ConfigurationService, public authService: AuthService) { }

ngOnInit() {
if (this.configuration == null) {
this.loadConfiguration();
}

}

loadConfiguration(): void {
this.configurationSevice.getConfiguration().subscribe(
response => this.configuration = response
);
}

}
