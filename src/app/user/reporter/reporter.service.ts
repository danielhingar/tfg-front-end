import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Reporter } from './reporter';

@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  private urlEndPoint = 'http://localhost:8080/reporter/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  create(reporter: Reporter): Observable<Reporter> {
    return this.http.post<Reporter>(this.urlEndPoint + 'create', reporter, {headers: this.httpHeaders}).pipe(
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

  getReporter(username): Observable<Reporter> {
    return this.http.get<Reporter>(`${this.urlEndPoint}${username}`);
  }

  update(reporter: Reporter): Observable<Reporter> {
    return this.http.put<Reporter>(`${this.urlEndPoint}update/${reporter.id}`, reporter, {headers: this.httpHeaders});
  }
}
