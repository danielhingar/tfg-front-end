import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Reporter } from './reporter';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  private urlEndPoint = URL_BACKEND + '/reporter/';
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

  create(reporter: Reporter): Observable<Reporter> {
    return this.http.post<Reporter>(this.urlEndPoint + 'create', reporter, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  getReporter(username): Observable<Reporter> {
    return this.http.get<Reporter>(`${this.urlEndPoint}${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  update(reporter: Reporter): Observable<Reporter> {
    return this.http.put<Reporter>(`${this.urlEndPoint}update/${reporter.id}`, reporter, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
