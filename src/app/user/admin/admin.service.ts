import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Usuario } from '../usuario';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlEndPoint = 'http://localhost:8080/admin/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClients(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + 'listClients').pipe(
      map(response => response as Usuario[])
    );
  }

  getCompanies(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + 'listCompanies').pipe(
      map(response => response as Usuario[])
    );
  }

  getReporters(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + 'listReporters').pipe(
      map(response => response as Usuario[])
    );
  }

  disable(id): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}disable/${id}`, {headers: this.httpHeaders});
  }

  enable(id): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}enable/${id}`, {headers: this.httpHeaders});
  }
}
