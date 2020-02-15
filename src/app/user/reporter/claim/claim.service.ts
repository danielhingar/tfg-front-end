import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Claim } from './claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private urlEndPoint = 'http://localhost:8080/reporter/claim';
  private urlEndPoint1 = 'http://localhost:8080/client/claim';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClaims(): Observable<Claim[]> {
    return this.http.get(`${this.urlEndPoint}/list`).pipe(
      map(response => response as Claim[])
    );
  }

  getClaimsReporter(username): Observable<Claim[]> {
    return this.http.get(`${this.urlEndPoint}/myClaims/${username}`).pipe(
      map(response => response as Claim[])
    );
  }

  updateReporte(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.urlEndPoint}/update/${claim.id}`, claim, {headers: this.httpHeaders});
  }

  assign(claim: Claim, id, username): Observable<Claim> {
    return this.http.put<Claim>(`${this.urlEndPoint}/assign/${id}/${username}`, claim, {headers: this.httpHeaders});
  }

  getClaim(id): Observable<Claim> {
    return this.http.get<Claim>(`${this.urlEndPoint}/show/${id}`);
  }

  showClaimClient(id): Observable<Claim> {
    return this.http.get<Claim>(`${this.urlEndPoint1}/show/${id}`);
  }

  getClaimsClient(username): Observable<Claim[]> {
    return this.http.get(`${this.urlEndPoint1}/myClaims/${username}`).pipe(
      map(response => response as Claim[])
    );
  }

  getClaimsFacture(id): Observable<Claim[]> {
    return this.http.get(`${this.urlEndPoint1}/claimByFacture/${id}`).pipe(
      map(response => response as Claim[])
    );
  }

  createClaim(claim: Claim, id): Observable<Claim> {
    return this.http.post<Claim>(`${this.urlEndPoint1}/create/${id}`, claim, {headers: this.httpHeaders}).pipe(
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

  updateClient(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.urlEndPoint1}/update/${claim.id}`, claim, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Claim> {
    return this.http.delete<Claim>(`${this.urlEndPoint1}/delete/${id}`).pipe(
      catchError( e => {


        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

}
