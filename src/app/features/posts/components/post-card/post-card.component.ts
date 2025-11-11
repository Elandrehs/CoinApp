import { Component, EventEmitter, Input, Output } from '@angular/core';
import {DatePipe, NgIf } from '@angular/common';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { IconButtonComponent } from '../../../../shared/components/buttons/icon-button/icon-button.component';
import { Router } from '@angular/router';
import { Post } from '../../models/post.entity';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [NgIf, AvatarComponent, IconButtonComponent,DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() likedByUser: boolean = false;
  @Output() likeToggled = new EventEmitter<void>();

  constructor(private router: Router) {}

  handleLikeClick(): void {
    this.likeToggled.emit();
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

  ngOnChanges() {
    console.log('🟢 Cambió likedByUser en post-card:', this.likedByUser);
  }
}

