import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation.service';
import { Conversation } from '../conversation';
import { Message } from '../messages';
import { AuthService } from '../../../../login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conversation-form',
  templateUrl: './conversation-form.component.html',
  styleUrls: ['./conversation-form.component.css']
})
export class ConversationFormComponent implements OnInit {

  conversation: Conversation = new Conversation();
  message: Message = new Message();
  completed1 = false;
  completed2 = false;
  id: number;
  temas: string[] = ['ENVÍO', 'DEVOLUCIONES', 'DETALLES DEL PRODUCTO', 'OTROS'];
  constructor(private conversationService: ConversationService, private authService: AuthService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  public createConversation(): void {

    this.activatedRoute.params.subscribe(params => {
      const username = params.username;
      if (username) {
        this.conversationService.createConversation(this.conversation,  this.authService.usuario.username, username).subscribe(
          response => {

          this.id = response;

        }
        );

      }
    });
}


  public create(): void {
    this.completed2 = true;
    this.conversationService.createMessage(this.message, this.id).subscribe(
      response => {


    }
    );
  }



}
