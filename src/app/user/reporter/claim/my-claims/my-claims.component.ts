import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { Claim } from '../claim';
import { AuthService } from '../../../../login/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.css']
})
export class MyClaimsComponent implements OnInit {

  claims: Claim[] = [];
  paginador: any;
  constructor(private claimService: ClaimService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClaims();
  }

  loadClaims(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.claimService.getClaimsReporter(this.authService.usuario.username, page).subscribe(
        claims => {
          this.claims = claims.content as Claim[];
          this.paginador = claims;
        }
      );
    }
    );
  }

}
