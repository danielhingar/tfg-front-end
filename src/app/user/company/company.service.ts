import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from './company';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private urlEndPoint = URL_BACKEND + '/company/';
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

  getCompanies(page: number): Observable<any> {
    return this.http.get<Company[]>(this.urlEndPoint + 'list' + '/page/' + page).pipe(
      map((response: any) => {
         (response.content as Company[]).map(company => {
          company.businessName = company.businessName.toUpperCase();
          return company;
      });
         return response;
    }
    )
    );

  }

  getCompanies1(): Observable<Company[]> {
    return this.http.get(this.urlEndPoint + 'list').pipe(
      map(response => response as Company[])
    );
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.urlEndPoint + 'create', company, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  getCompany(username): Observable<Company> {
    return this.http.get<Company>(`${this.urlEndPoint}${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  update(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.urlEndPoint}update/${company.id}`, company, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getCompanyId(id): Observable<Company> {
    return this.http.get<Company>(`${this.urlEndPoint}show/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
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

    const req = new HttpRequest('POST', `${this.urlEndPoint}upload`, formData, {
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

  getProductByCategory(username): Observable<Map<string, number>> {
    return this.http.get(this.urlEndPoint + `statistics/productByCategory/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Map<string, number>),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }


  getProductSold(username): Observable<Map<string, number>> {
    return this.http.get(this.urlEndPoint + `statistics/productSold/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Map<string, number>),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getProductOffert(username): Observable<Map<string, number>> {
    return this.http.get(this.urlEndPoint + `statistics/productOffert/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Map<string, number>),
      catchError( e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }
}
