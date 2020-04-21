import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { About } from './about';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../login/auth.service';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../../../config/config';


@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private urlEndPoint = URL_BACKEND + '/company/about';

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

  getAbout(id): Observable<About> {
    return this.http.get<About>(`${this.urlEndPoint}/show/${id}`);
  }

  update(about: About): Observable<About> {
    return this.http.put<About>(`${this.urlEndPoint}/update/${about.id}`, about, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
