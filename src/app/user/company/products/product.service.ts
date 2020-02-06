import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
import { Basket } from '../../client/basket/basket';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlEndPoint = 'http://localhost:8080/product';
  private urlEndPoint1 = 'http://localhost:8080/company/product';
  private urlEndPoint2 = 'http://localhost:8080/client/basket';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/show/${id}`);
  }

  getProductsCompany(username): Observable<Product[]> {
    return this.http.get(`${this.urlEndPoint}/list/${username}`).pipe(
      map(response => {
        const products = response as Product[];

        return products.map( product => {
          product.name = product.name.toUpperCase();
          return product;
        });
      }
    )
    );
  }

  createProduct(product: Product, username): Observable<Product> {
    return this.http.post<Product>(`${this.urlEndPoint1}/create/${username}`, product, {headers: this.httpHeaders}).pipe(
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

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlEndPoint1}/update/${product.id}`, product, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.urlEndPoint1}/delete/${id}`).pipe(
      catchError( e => {


        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  getBasket(username): Observable<Basket> {
    return this.http.get(`${this.urlEndPoint2}/showBasket/${username}`).pipe(
      map( response => response as Basket)
    );
  }
}
