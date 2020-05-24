import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { Message } from '../messages';
import { formatDate } from '@angular/common';
import { Conversation } from '../conversation';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../../../../login/auth.service';
@Component({
  selector: 'app-detail-conversation',
  templateUrl: './detail-conversation.component.html',
  styleUrls: ['./detail-conversation.component.css']
})
export class DetailConversationComponent implements OnInit {
  messages: Message[] = [];
  public message: Message = new Message();
  paginador: any;
  @Input() conversation: Conversation;
  constructor(private conversationService: ConversationService, private activatedRouter: ActivatedRoute, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Conversation, public authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
    console.log(this.messages);

  }

  loadMessages(): void {
      this.conversationService.getMessages(0, this.data.id).subscribe(
        messages => {
          this.messages = messages.content as Message[];
          this.paginador = messages;
        }
      );
    }


  public create(): void {
    this.conversationService.createMessage(this.message, this.data.id).subscribe(
      response => {
        response.createDate = formatDate(response.createDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');
        this.messages.push(response);

    }
    );
    this.message = new Message();
  }

  public createCompany(): void {
    this.conversationService.createMessageCompany(this.message, this.data.id).subscribe(
      response => {
        response.createDate = formatDate(response.createDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');
        this.messages.push(response);

    }
    );
    this.message = new Message();
  }
  }


