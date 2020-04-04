import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../../../../login/auth.service';
import { Comentario } from '../comentario';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  public comentario: Comentario = new Comentario();
  comments: Comentario[] = [];
  paginador: any;

  constructor(private commentService: CommentService, private router: Router, private activatedRouter: ActivatedRoute,
              public authService: AuthService) {
              }

  ngOnInit() {
    this.loadComments();
  }

  public create(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.commentService.createComment(this.comentario, id, this.authService.usuario.username).subscribe(
          response => {
            response.createDate = formatDate(response.createDate, 'dd-MM-yyyy', 'en-US');
            this.comments.unshift(response);
            this.router.navigate(['/detailsProduct/', params.id]);

          }
        );
      }
      return this.comentario = new Comentario();
    });
  }



  loadComments(): void {
    this.activatedRouter.paramMap.subscribe(params => {
      const id = +params.get('id');

      if (id) {
        this.commentService.getCommentsProduct(id, 0).subscribe(
          comments => {
            this.comments = comments.content as Comentario[];
            this.paginador = comments;
          }
        );
      }
    }
    );
  }

  delete(comment: Comentario): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro/a?',
      text: `¿Vas eliminar el comentario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.commentService.delete(comment.id).subscribe(
          response => {
            this.comments = this.comments.filter(cli => cli !== comment);
          }
        );
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El comentario ha sido eliminado con éxito',
          'success'
        );
      }
    });
  }

  public condition(comment: Comentario): boolean {
    let res = false;
    if (comment.client.username === this.authService.usuario.username) {
      res = true;
    }
    return res;
  }



  public arrayStarts(comment: Comentario): Array<number> {
    const starts = new Array(comment.valoration);
    return starts;
  }

  public arrayStartsEmpty(comment: Comentario): Array<number> {
    const starts1 = new Array(5 - comment.valoration);
    return starts1;
  }

}
