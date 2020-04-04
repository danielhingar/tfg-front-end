import { Component, OnInit } from '@angular/core';
import { Claim } from '../../../reporter/claim/claim';
import { ClaimService } from '../../../reporter/claim/claim.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.css']
})
export class CreateClaimComponent implements OnInit {

  claim: Claim = new Claim();
  constructor(private claimService: ClaimService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  public create(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.claimService.createClaim(this.claim, id).subscribe(
        response => {
        this.router.navigate(['/myClaim/page/0']);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Queja',
          text: `Nueva queja añadida a la factura`,
          showConfirmButton: false,
          width: 350,
          timer: 1800,
        });
    }
    );
  }
  });
}



}
