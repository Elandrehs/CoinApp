import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf } from '@angular/common';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { IconButtonComponent } from '../../../../shared/components/buttons/icon-button/icon-button.component';
import { Router } from '@angular/router';
import { Post } from '../../models/post.entity';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    AvatarComponent,
    IconButtonComponent
  ]
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() commentsLength=0;
  @Output() likeToggled = new EventEmitter<Post>();

  constructor(private router: Router) {}

  handleGoToPost(post: Post): void {
    if (!post._id) {
      console.error('❌ No se puede navegar: post.id es undefined', post);
      return;
    }
    this.router.navigate(['/main/post', post._id]);
  }

  handleGoToProfile(event: MouseEvent, post: Post): void {
    const postUserId= post.author._id;
    if (!postUserId) {
      console.error('❌ No se puede navegar: post.author._id es undefined', post);
      return;
    }
    event.stopPropagation();
    this.router.navigate(['/main/profile', postUserId]);
  }

  handleStopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  handleLikeClick(event: MouseEvent, post: Post): void {
    event.stopPropagation();
    this.likeToggled.emit(post); //
  }

}
