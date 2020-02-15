import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Shipping } from './shipping';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private urlEndPoint = 'http://localhost:8080/admin/shipping';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getShippings(): Observable<Shipping[]> {
    return this.http.get(`${this.urlEndPoint}/list`).pipe(
      map(response => response as Shipping[])
    );
  }

  getShipping(id): Observable<Shipping> {
    return this.http.get<Shipping>(`${this.urlEndPoint}/show/${id}`);
  }

  createShipping(shipping: Shipping): Observable<Shipping> {
    return this.http.post<Shipping>(`${this.urlEndPoint}/create`, shipping, {headers: this.httpHeaders}).pipe(
      catchError( e => {
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
    return this.http.put<Shipping>(`${this.urlEndPoint}/update/${shipping.id}`, shipping, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Shipping> {
    return this.http.delete<Shipping>(`${this.urlEndPoint}/delete/${id}`).pipe(
      catchError( e => {


        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }
}
