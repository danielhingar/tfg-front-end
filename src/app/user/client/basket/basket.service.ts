import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Basket } from './basket';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemBasket } from './itemBasket';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../../config/config';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  urlEndPoint = URL_BACKEND + '/client/basket';
  urlEndPoint1 = URL_BACKEND + '/client/itemBasket';
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


  getBasket(username): Observable<ItemBasket[]> {
    return this.http.get(`${this.urlEndPoint}/show/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map( response => response as ItemBasket[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }


  updateItem(itemBasket: ItemBasket): Observable<ItemBasket> {
    return this.http.put<ItemBasket>(`${this.urlEndPoint1}/update/${itemBasket.id}`, itemBasket,
     {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  addProductToBasket(basket: Basket, username, productId, size, capacity ) {
    return this.http.put<Basket>(`${this.urlEndPoint}/update/${username}/${productId}/${size}/${capacity}`, basket,
    {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<ItemBasket> {
    return this.http.delete<ItemBasket>(`${this.urlEndPoint1}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  updateStatusItem(itemBasket: ItemBasket): Observable<ItemBasket> {
    return this.http.put<ItemBasket>(`${this.urlEndPoint1}/updateStatus/${itemBasket.id}`, itemBasket,
     {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
