import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
import { Basket } from '../../client/basket/basket';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';
import { URL_BACKEND } from '../../../config/config';
import { Client } from '../../client/client';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlEndPoint = URL_BACKEND + '/product';
  private urlEndPoint1 = URL_BACKEND + '/company/product';
  private urlEndPoint2 = URL_BACKEND + '/client/basket';
  private urlEndPoint3 = URL_BACKEND + '/client';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


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

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/show/${id}`);
  }


  getProductsClient(page: number, username): Observable<any> {
    return this.http.get(this.urlEndPoint + '/list' + '/page/' + page + '/' + username, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Product[]).map(product => {
          product.name = product.name.toUpperCase();
          return product;
        });
        return response;
      }
      )
    );

  }

  getProductsCompany(page: number, username): Observable<any> {
    return this.http.get(this.urlEndPoint1 + '/list' + '/page/' + page + '/' + username, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Product[]).map(product => {
          product.name = product.name.toUpperCase();
          return product;
        });
        return response;
      }
      )
    );

  }

  createProduct(product: Product, username): Observable<Product> {
    return this.http.post<Product>(`${this.urlEndPoint1}/create/${username}`, product, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlEndPoint1}/update/${product.id}`, product, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.urlEndPoint1}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  getBasket(username): Observable<Basket> {
    return this.http.get(`${this.urlEndPoint2}/showBasket/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Basket),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })

    );
  }

  uploadPhoto(archivo: File, id): Observable<HttpEvent<{}>> {
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

  recommendation(id): Observable<Product[]> {
    return this.http.get(`${this.urlEndPoint}/recomendation/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Product[]),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
}

avgValoration(id): Observable<number> {
  return this.http.get(`${this.urlEndPoint}/avgValoration/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
    map(response => response as number)
  );
}

addWish(client: Client , product, username): Observable<Client> {
  return this.http.put<Client>(`${this.urlEndPoint3}/addWish/${username}/${product.id}`, client,
   {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError( e => {
      this.isNoAutorizado(e);
      return throwError(e);
    })
  );
}

removeWish(client: Client , product, username): Observable<Client> {
  return this.http.delete<Client>(`${this.urlEndPoint3}/removeWish/${username}/${product.id}`,
   {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError( e => {
      this.isNoAutorizado(e);
      return throwError(e);
    })
  );
}
}
