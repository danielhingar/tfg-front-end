import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlEndPoint = URL_BACKEND + '/admin/';
  private urlEndPoint1 = URL_BACKEND +  '/admin/configuration';
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

  getClients(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + 'listClients', {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Usuario[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getCompanies(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + 'listCompanies', {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Usuario[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getReporters(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + 'listReporters', {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Usuario[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  disable(id): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}disable/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  enable(id): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}enable/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getProductByCompany(): Observable<Map<string, number>> {
    return this.http.get(this.urlEndPoint1 + '/statistics/productByCompany', {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Map<string, number>),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getProductByClient(): Observable<Map<string, number>> {
    return this.http.get(this.urlEndPoint1 + '/statistics/productByClient', {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Map<string, number>),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getProductSoldByCompany(): Observable<Map<string, number>> {
    return this.http.get(this.urlEndPoint1 + '/statistics/productSoldByCompany', {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Map<string, number>),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }
}
