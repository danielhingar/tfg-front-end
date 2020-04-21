import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Claim } from './claim';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private urlEndPoint = URL_BACKEND + '/reporter/claim';
  private urlEndPoint1 = URL_BACKEND + '/client/claim';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    const token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status === 403) {
      swal.fire('Acceso denegado', 'No tienes los permisos necesarios', 'warning');
      this.router.navigate(['home/page/0']);
      return true;
    }
    if (e.status === 401 ) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['']);
      return true;
    }
    return false;
  }

  getClaims(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/list/page/${page}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Claim[]).map(claim => {
          return claim;
        });
        return response;
      }
      ),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getClaimsReporter(username, page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/myClaims/page/${page}/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Claim[]).map(claim => {

          return claim;
        });
        return response;
      }
      ),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  updateReporte(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.urlEndPoint}/update/${claim.id}`, claim, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  assign(claim: Claim, id, username): Observable<Claim> {
    return this.http.put<Claim>(`${this.urlEndPoint}/assign/${id}/${username}`, claim, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClaim(id): Observable<Claim> {
    return this.http.get<Claim>(`${this.urlEndPoint}/show/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  showClaimClient(id): Observable<Claim> {
    return this.http.get<Claim>(`${this.urlEndPoint1}/show/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClaimsClient(username, page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint1}/myClaims/page/${page}/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Claim[]).map(claim => {

          return claim;
        });
        return response;
      }
      ),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getClaimsFacture(id): Observable<Claim[]> {
    return this.http.get(`${this.urlEndPoint1}/claimByFacture/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Claim[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  createClaim(claim: Claim, id): Observable<Claim> {
    return this.http.post<Claim>(`${this.urlEndPoint1}/create/${id}`, claim, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status === 400) {
          return throwError(e);
        }
        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  updateClient(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.urlEndPoint1}/update/${claim.id}`, claim, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Claim> {
    return this.http.delete<Claim>(`${this.urlEndPoint1}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  uploadFile(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    let httpHeaders = new HttpHeaders();
    const token = this.authService.token;
    if ( token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint1}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}
