import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Shipping } from './shipping';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private urlEndPoint = 'http://localhost:8080/admin/shipping';

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

  getShippings(): Observable<Shipping[]> {
    return this.http.get(`${this.urlEndPoint}/list`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Shipping[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getShipping(id): Observable<Shipping> {
    return this.http.get<Shipping>(`${this.urlEndPoint}/show/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  createShipping(shipping: Shipping): Observable<Shipping> {
    return this.http.post<Shipping>(`${this.urlEndPoint}/create`, shipping, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  update(shipping: Shipping): Observable<Shipping> {
    return this.http.put<Shipping>(`${this.urlEndPoint}/update/${shipping.id}`, shipping, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Shipping> {
    return this.http.delete<Shipping>(`${this.urlEndPoint}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
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
}
