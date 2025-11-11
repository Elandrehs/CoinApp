import { Component, Input } from '@angular/core';
import {AvatarComponent} from "../../../../shared/components/avatar/avatar.component";
import {IconButtonComponent} from "../../../../shared/components/buttons/icon-button/icon-button.component";
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from '@angular/router';
import { Comment } from '../../models/comment.entity';
import {Post} from '../../models/post.entity';

@Component({
  selector: 'app-comment-list',
  imports: [
    AvatarComponent,
    IconButtonComponent,
    NgForOf,
    DatePipe
  ],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];

  constructor(private router: Router) {
  }


  handleGoToProfile(event: MouseEvent, comment: Comment): void {
    const commentUserId= comment.userId._id;
    if (!commentUserId) {
      console.error('❌ No se puede navegar: comment.userId._id es undefined', comment);
      return;
    }
    event.stopPropagation();
    this.router.navigate(['/main/profile', commentUserId]);
  }

}
