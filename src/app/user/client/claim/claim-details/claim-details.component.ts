import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../../reporter/claim/claim.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Claim } from 'src/app/user/reporter/claim/claim';
import swal from 'sweetalert2';
import { AuthService } from '../../../../login/auth.service';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {
  status: string[] = ['EN PROCESO', 'DENEGADA',  'ACEPTADA'];
  claim: Claim = new Claim();
  constructor(private claimService: ClaimService, private router: Router, private activatedRouter: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit() {
    if (this.claim.id !== null) {
    this.loadClaim();
  }
  }

  loadClaim(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.claimService.showClaimClient(id).subscribe( (claim) => this.claim = claim);
      }
    });
  }


  update(): void {
    this.claimService.updateReporte(this.claim).subscribe( claim => {
      this.router.navigate(['/myClaims']);
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Queja',
        text: `La queja ha sido actualizada`,
        showConfirmButton: false,
        width: 350,
        timer: 2200,
      });
    });
  }

}
