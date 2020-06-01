import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Client } from './client';
import {  Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint = URL_BACKEND + '/client/';
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

  private nombreUsado(e): boolean {
    if (e.status === 409) {
      swal.fire('Error', 'Ese nombre de usuario está en uso, pruebe con otro', 'warning');
      return true;
    }
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint + 'create', client, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status === 400) {
          return throwError(e);
        }
        if (this.nombreUsado(e)) {
          return throwError(e);
        }
        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getClient(username): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}update/${client.id}`, client, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
