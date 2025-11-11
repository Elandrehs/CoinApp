import { Component, OnInit } from '@angular/core';
import { CommentFormComponent } from '../../components/comment-form/comment-form.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.entity';
import { Comment } from '../../models/comment.entity';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../../../shared/services/authentication.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-post-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    CommentFormComponent,
    CommentListComponent,
    PostCardComponent
  ],
  templateUrl: './post-detail-page.component.html',
  styleUrl: './post-detail-page.component.css'
})
export class PostDetailPageComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  likedByUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getById(postId).subscribe({
        next: (postData) => {
          this.post = new Post(postData);

          const userId = this.authService.getUserId();
          console.log('✅ Usuario logueado:', userId);
          console.log('📦 Likes del post:', this.post.likes);

          if (userId) {
            this.likedByUser = this.post.likes.some(uid => uid.toString() === userId.toString());
            this.cdr.detectChanges(); // 🔄 Fuerza redibujado del checkbox
            console.log('❤️ ¿Ya dio like?', this.likedByUser);
          }


          this.loadComments(postData._id);
        },
        error: (err) => console.error('❌ Error al cargar el post:', err)
      });
    }
  }
  loadComments(postId: string): void {
    this.commentService.getAllByParamId('postId', postId).subscribe({
      next: (comments) => {
        this.comments = comments.map(c => new Comment(c));
      },
      error: (err) => console.error('❌ Error al cargar comentarios:', err)
    });
  }

  handleSubmitComment(content: string): void {
    if (!this.post) return;
    const payload = {
      content,
      postId: this.post._id
    };

    this.commentService.create(payload as Comment).subscribe({
      next: (newComment) => {
        this.comments.push(new Comment(newComment));
      },
      error: (err) => console.error('❌ Error al crear comentario:', err)
    });
  }

  handleToggleLike(): void {
    if (!this.post) return;

    this.postService.toggleLike(this.post._id).subscribe({
      next: () => {
        const userId = this.authService.getUserId();
        if (!userId) return;

        const alreadyLiked = this.post!.likes.includes(userId);
        if (alreadyLiked) {
          this.post = new Post({
            ...this.post!,
            likes: this.post!.likes.filter(uid => uid !== userId),
            likesCount: this.post!.likesCount - 1
          });
          this.likedByUser = false;

        } else {
          this.post = new Post({
            ...this.post!,
            likes: [...this.post!.likes, userId],
            likesCount: this.post!.likesCount + 1
          });
          this.likedByUser = true;

        }
      },
      error: (err) => {
        console.error('❌ Error al alternar like:', err);
      }
    });
  }
  isLikedByUser(post: Post): boolean {
    const userId = this.authService.getUserId();
    if (!userId) return false;
    return post.likes.includes(userId);
  }

}
