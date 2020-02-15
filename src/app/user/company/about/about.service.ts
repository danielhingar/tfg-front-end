import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { About } from './about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private urlEndPoint = 'http://localhost:8080/company/about';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAbout(id): Observable<About> {
    return this.http.get<About>(`${this.urlEndPoint}/show/${id}`);
  }

  update(about: About): Observable<About> {
    return this.http.put<About>(`${this.urlEndPoint}/update/${about.id}`, about, {headers: this.httpHeaders});
  }
}
