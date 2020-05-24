import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { URL_BACKEND } from '../../../config/config';
import { AuthService } from '../../../login/auth.service';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Conversation } from './conversation';
import { Message } from './messages';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private urlEndPoint = URL_BACKEND + '/client/conversation';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlEndPoint1 = URL_BACKEND + '/client/message';
  private urlEndPoint2 = URL_BACKEND + '/company';

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

  create(conversation: Conversation, username, companyUser): Observable<Conversation> {
    return this.http.post<Conversation>(this.urlEndPoint + `/create/${username}/${companyUser}`, conversation,
    {headers: this.agregarAuthorizationHeader()}).pipe(
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

  getConversations(page: number, username): Observable<any> {
    return this.http.get(this.urlEndPoint + '/myConversations/page/' + page + '/' + username,
    {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Conversation[]).map(conversation => {
          conversation.issue = conversation.issue.toUpperCase();
          return conversation;
        });
        return response;
      }
      )
    );

  }

  delete(id: number): Observable<Conversation> {
    return this.http.delete<Conversation>(`${this.urlEndPoint}/delete/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
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

  getMessages(page: number, id): Observable<any> {
    return this.http.get(this.urlEndPoint1 + '/page/' + page + '/' + id,
    {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        (response.content as Message[]).map(message => {
          message.createDate = formatDate(message.createDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');
          return message;
        });
        return response;
      }
      )
    );

  }
  createMessage(message: Message, id): Observable<Message> {
    return this.http.post<Message>(`${this.urlEndPoint1}/create/${id}`, message,
      { headers: this.agregarAuthorizationHeader() }).pipe(
        map((response: any) => {
          return response.message as Message;
      }
    ));
}

createMessageCompany(message: Message, id): Observable<Message> {
  return this.http.post<Message>(`${this.urlEndPoint2}/message/create/${id}`, message,
    { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => {
        return response.message as Message;
    }
  ));
}

getConversationsCompany(page: number, username): Observable<any> {
  return this.http.get(this.urlEndPoint2 + '/myConversations/page/' + page + '/' + username,
  {headers: this.agregarAuthorizationHeader()}).pipe(
    map((response: any) => {
      (response.content as Conversation[]).map(conversation => {
        conversation.issue = conversation.issue.toUpperCase();
        return conversation;
      });
      return response;
    }
    )
  );

}
}
