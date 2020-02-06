import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Basket } from './basket';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemBasket } from './itemBasket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  urlEndPoint = 'http://localhost:8080/client/basket';
  urlEndPoint1 = 'http://localhost:8080/client/itemBasket';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }


  getBasket(username): Observable<ItemBasket[]> {
    return this.http.get(`${this.urlEndPoint}/show/${username}`).pipe(
      map( response => response as ItemBasket[])
    );
  }


  updateItem(itemBasket: ItemBasket): Observable<ItemBasket> {
    return this.http.put<ItemBasket>(`${this.urlEndPoint1}/update/${itemBasket.id}`, itemBasket, {headers: this.httpHeaders});
  }

  addProductToBasket(basket: Basket, username, productId, size, capacity ) {
    return this.http.put<Basket>(`${this.urlEndPoint}/update/${username}/${productId}/${size}/${capacity}`, basket,
    {headers: this.httpHeaders});
  }

  delete(id: number): Observable<ItemBasket> {
    return this.http.delete<ItemBasket>(`${this.urlEndPoint1}/delete/${id}`).pipe(
      catchError( e => {


        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }
}
