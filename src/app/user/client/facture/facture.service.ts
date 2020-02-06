import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Facture } from './facture';


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private urlEndPoint = 'http://localhost:8080/client/facture';
  private urlEndPoint1 = 'http://localhost:8080/company/facture';
  private urlEndPoint2 = 'http://localhost:8080/reporter/facture';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getFacturesPending(username): Observable<Facture> {
    return this.http.get(`${this.urlEndPoint}/myFacturesPending/${username}`).pipe(
      map(response => response as Facture)
    );
  }

  getFactures(username): Observable<Facture[]> {
    return this.http.get(`${this.urlEndPoint}/myFactures/${username}`).pipe(
      map(response => response as Facture[])
    );
  }

  getFacturesCompany(username): Observable<Facture[]> {
    return this.http.get(`${this.urlEndPoint1}/myFactures/${username}`).pipe(
      map(response => response as Facture[])
    );
  }

  getFacturesAll(): Observable<Facture[]> {
    return this.http.get(`${this.urlEndPoint2}/all`).pipe(
      map(response => response as Facture[])
    );
  }

  getFacture(id): Observable<Facture> {
    return this.http.get<Facture>(`${this.urlEndPoint}/show/${id}`);
  }

  createFacture(facture: Facture, username ) {
    return this.http.post(`${this.urlEndPoint}/create/${username}`, facture, {headers: this.httpHeaders});
  }

  createFactureUnify(facture: Facture, username ) {
    return this.http.post(`${this.urlEndPoint}/createFactureUnify/${username}`, facture, {headers: this.httpHeaders});
  }

  updateFacture(facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.urlEndPoint}/update/${facture.id}`, facture, {headers: this.httpHeaders});
  }

  updateFactureReporter(facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.urlEndPoint2}/update/${facture.id}`, facture, {headers: this.httpHeaders});
  }


}

