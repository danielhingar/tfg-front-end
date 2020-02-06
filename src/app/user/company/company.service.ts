import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private urlEndPoint = 'http://localhost:8080/company/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get(this.urlEndPoint + 'list').pipe(
      map(response => response as Company[])
    );
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.urlEndPoint + 'create', company, {headers: this.httpHeaders}).pipe(
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

  getCompany(username): Observable<Company> {
    return this.http.get<Company>(`${this.urlEndPoint}${username}`);
  }

  update(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.urlEndPoint}update/${company.id}`, company, {headers: this.httpHeaders});
  }

  getCompanyId(id): Observable<Company> {
    return this.http.get<Company>(`${this.urlEndPoint}show/${id}`);
  }
}
