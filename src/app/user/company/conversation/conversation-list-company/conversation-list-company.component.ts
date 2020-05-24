import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/user/client/conversation/conversation';
import { ConversationService } from '../../../client/conversation/conversation.service';
import { AuthService } from '../../../../login/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DetailConversationComponent } from '../../../client/conversation/detail-conversation/detail-conversation.component';
@Component({
  selector: 'app-conversation-list-company',
  templateUrl: './conversation-list-company.component.html',
  styleUrls: ['./conversation-list-company.component.css']
})
export class ConversationListCompanyComponent implements OnInit {
  conversations: Conversation[] = [];
  paginador: any;
  conversationSeleccionada: Conversation;
  constructor(private conversationService: ConversationService, private authService: AuthService,
              private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadConversation();

  }

  loadConversation(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.conversationService.getConversationsCompany(page, this.authService.usuario.username).subscribe(
        conversations => {
          this.conversations = conversations.content as Conversation[];
          this.paginador = conversations;
        }
      );
    }
    );
  }

  openDialog(conversation: Conversation) {

    this.dialog.open(DetailConversationComponent, {
      data: {
        id: conversation.id,
        company: conversation.company,
        client: conversation.client
      }
    });
  }


}
