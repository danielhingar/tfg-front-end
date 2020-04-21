import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';
import swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comentario } from './comentario';
import { formatDate } from '@angular/common';
import { URL_BACKEND } from '../../../config/config';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private urlEndPoint = URL_BACKEND + '/comment';
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
    if (e.status === 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['']);
      return true;
    }
    return false;
  }


  getCommentsProduct(id, page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/product/page/${page}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => {
        (response.content as Comentario[]).map(comment => {
          comment.createDate = formatDate(comment.createDate, 'dd-MM-yyyy', 'en-US');
          return comment;
        });
        return response;
      }
      )
    );

  }

  getComment(id): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.urlEndPoint}/show/${id}`, { headers: this.agregarAuthorizationHeader() }
    );
  }

  conditionDelete(username, commentId): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/condition/${username}/${commentId}`, { headers: this.agregarAuthorizationHeader() });
  }

  createComment(comment: Comentario, id, username): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.urlEndPoint}/create/${id}/${username}`, comment,
      { headers: this.agregarAuthorizationHeader() }).pipe(
        map((response: any) => {
          return response.comment as Comentario;
      }
    ));
}


delete(id: number): Observable < Comentario > {
  return this.http.delete<Comentario>(`${this.urlEndPoint}/delete/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
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
}
