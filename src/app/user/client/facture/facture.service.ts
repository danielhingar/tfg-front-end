import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Facture } from './facture';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../../config/config';


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private urlEndPoint = URL_BACKEND + '/client/facture';
  private urlEndPoint1 = URL_BACKEND + '/company/facture';
  private urlEndPoint2 = URL_BACKEND + '/reporter/facture';
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

  getFacturesPending(username): Observable<Facture> {
    return this.http.get(`${this.urlEndPoint}/myFacturesPending/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Facture),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getFactures(page: number, username): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/myFactures/page/${page}/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Facture[]).map(facture => {
          return facture;
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

  getFacturesCompany(page: number, username): Observable<any> {
    return this.http.get(`${this.urlEndPoint1}/myFactures/page/${page}/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Facture[]).map(facture => {
          return facture;
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

  getFacturesAll(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint2}/all/page/${page}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Facture[]).map(factures => {
          return factures;
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

  getFacturesAllCompany(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint2}/allCompany/page/${page}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Facture[]).map(factures => {
          return factures;
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



  getFacture(id): Observable<Facture> {
    return this.http.get<Facture>(`${this.urlEndPoint}/show/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  createFacture(facture: Facture, username ) {
    return this.http.post(`${this.urlEndPoint}/create/${username}`, facture, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  createFactureUnify(facture: Facture, username ) {
    return this.http.post(`${this.urlEndPoint}/createFactureUnify/${username}`, facture, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  updateFacture(facture: Facture, username): Observable<Facture> {
    return this.http.put<Facture>(`${this.urlEndPoint}/update/${facture.id}/${username}`, facture,
     {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  updateFactureReporter(facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.urlEndPoint2}/update/${facture.id}`, facture, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  payCompany(facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.urlEndPoint2}/payCompany/${facture.id}`, facture,
     {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }


}

