import { Component, OnInit } from '@angular/core';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { AuthService } from '../../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material';
import { DetailConversationComponent } from '../detail-conversation/detail-conversation.component';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: Conversation[] = [];
  paginador: any;
  conversationSeleccionada: Conversation;
  constructor(private conversationService: ConversationService, private authService: AuthService, private router: Router,
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
      this.conversationService.getConversations(page, this.authService.usuario.username).subscribe(
        conversations => {
          this.conversations = conversations.content as Conversation[];
          this.paginador = conversations;
        }
      );
    }
    );
  }

  delete(conversation: Conversation): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro/a?',
      text: `¿Vas eliminar la conversación ${conversation.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.conversationService.delete(conversation.id).subscribe(
          response => {
            this.conversations = this.conversations.filter(cli => cli !== conversation);
          }
        );
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'La conversación ha sido eliminado con éxito',
          'success'
        );
      }
    });
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
