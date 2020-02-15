import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { Claim } from '../claim';
import { AuthService } from '../../../../login/auth.service';

@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.css']
})
export class MyClaimsComponent implements OnInit {

  claims: Claim[] = [];
  constructor(private claimService: ClaimService, private authService: AuthService) { }

  ngOnInit() {
    this.loadClaims(this.authService.usuario.username);
  }

  loadClaims(username): void {
    this.claimService.getClaimsReporter(username).subscribe(
      claims => this.claims = claims
    );
  }

}
