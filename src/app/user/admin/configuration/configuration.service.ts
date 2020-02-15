import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private urlEndPoint = 'http://localhost:8080/admin/configuration';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getConfiguration(): Observable<Configuration> {
    return this.http.get<Configuration>(`${this.urlEndPoint}/show`);
  }


  update(configuration: Configuration): Observable<Configuration> {
    return this.http.put<Configuration>(`${this.urlEndPoint}/update`, configuration, {headers: this.httpHeaders});
  }


}
