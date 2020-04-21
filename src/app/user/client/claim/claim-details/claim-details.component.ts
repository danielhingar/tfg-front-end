import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../../reporter/claim/claim.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Claim } from 'src/app/user/reporter/claim/claim';
import swal from 'sweetalert2';
import { AuthService } from '../../../../login/auth.service';
import { HttpEventType } from '@angular/common/http';
import { URL_BACKEND } from '../../../../config/config';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {
  status: string[] = ['EN PROCESO', 'DENEGADA',  'ACEPTADA'];
  claim: Claim = new Claim();
  public fotoSeleccionada: File;
  progreso = 0;
  urlBackend: string =  URL_BACKEND;
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
      this.router.navigate(['/myClaims/page/0']);
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


seleccionarFoto(event) {
  this.fotoSeleccionada = event.target.files[0];
  this.progreso = 0;

}

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Producto',
        text: `Debe seleccionar una foto`,
        showConfirmButton: false,
        width: 350,
        timer: 1400,
      });
    } else {
    this.claimService.uploadFile(this.fotoSeleccionada, this.claim.id).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          const response: any = event.body;
          this.claim = response.claim as Claim;
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Queja',
            text: `Se ha subido correctamente el archivo`,
            showConfirmButton: false,
            width: 350,
            timer: 1400,
          });
        }

      }
    );
  }
  }
}
