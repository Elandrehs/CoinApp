import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.entity';
import {AuthService} from '../../../../shared/services/authentication.service';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [PostFormComponent, PostListComponent],
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {
  posts: Post[] = [];
  commentCounts=0;

  constructor(private postService: PostService, private authService: AuthService,private commentService:CommentService) {}

  ngOnInit(): void {
    this.loadPosts();

  }

  loadPosts(): void {
    this.postService.getAll().subscribe({
      next: (response: Post[]) => {
        console.log('✅ Posts recibidos:', response);
        this.posts = response;

      },
      error: (err) => {
        console.error('❌ Error al cargar posts:', err);
      }
    });
  }
  loadCommentCount(postId: string): number {
    this.commentService.getAllByParamId('postId', postId).subscribe({
      next: (comments) => {
        const len = comments.length;
        this.commentCounts = len;
      },
      error: (err) => {
        console.error(`❌ Error al cargar comentarios del post ${postId}:`, err);
        this.commentCounts = 0;
      }
    });
    return this.commentCounts;
  }



  onPostSubmit(content: string): void {
    const payload: Partial<Post> = {
      title: 'Nuevo post',
      content,
      images: ['https://imgur.com/abc.jpg'],
      tags: ['novedad', 'foto'],
      privacy: 'friends',
      location: {
        name: 'Lima',
        coordinates: [-12.0464, -77.0428]
      }
    };

    this.postService.create(payload as Post).subscribe({
      next: (newPost) => {
        console.log('✅ Post creado:', newPost);
        this.posts.unshift(newPost); // agregamos el nuevo post arriba
      },
      error: (err) => {
        console.error('❌ Error al crear post:', err);
      }
    });
  }
  handleToggleLike(post: Post): void {
    this.postService.toggleLike(post._id).subscribe({
      next: () => {
        const userId = this.authService.getUserId();
        if (!userId) return;

        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
          post.likes = post.likes.filter(uid => uid !== userId);
          post.likesCount--;
        } else {
          post.likes.push(userId);
          post.likesCount++;
        }
      },
      error: (err) => {
        console.error('❌ Error al dar like al post:', err);
      }
    });
  }

}
