import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostListComponent } from '../../../posts/components/post-list/post-list.component';
import { ProfileViewComponent } from '../../components/profile-view/profile-view.component';
import { FriendListComponent } from '../../../friendships/components/friend-list/friend-list.component';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../shared/services/authentication.service';
import {User} from '../../../authentication/models/user.entity';
import {UserService} from '../../../authentication/services/user.service';
import { Post } from '../../../posts/models/post.entity';
import { PostService } from '../../../posts/services/post.service';
import {FriendRequestService} from '../../../friend-requests/services/friend-request.service';
import {FriendRequest} from '../../../friend-requests/models/friend-request.entity';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    PostListComponent,
    ProfileViewComponent,
    FriendListComponent,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  activeTab: 'posts' | 'friends' = 'posts';
  user: User | null = null;
  isOwnProfile: boolean = false;
  posts: Post[] = [];
  friends: any[] = [];
  addedFriends: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private friendRequestService: FriendRequestService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    let currentUserId = this.authService.getUserId();

    // 🔧 Scanea el ID si viene con comillas
    if (currentUserId?.startsWith('"') && currentUserId.endsWith('"')) {
      currentUserId = currentUserId.slice(1, -1);
    }

    console.log('📌 ID desde la ruta:', routeId);
    console.log('👤 ID del usuario logueado:', currentUserId);

    const targetUserId = routeId || currentUserId;

    if (!targetUserId) {
      console.error('❌ No se encontró ID de usuario.');
      return;
    }

    this.isOwnProfile = routeId === currentUserId;
    console.log('🧠 ¿Es su propio perfil?', this.isOwnProfile);

    this.userService.getById(targetUserId).subscribe({
      next: (userData) => {
        this.user = new User(userData);
        console.log('✅ Usuario cargado:', this.user);
        this.loadUserPosts(targetUserId);
        this.loadFriends(targetUserId);
        if (currentUserId) {
          this.loadAddedFriends(currentUserId);
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar perfiil:', err);
      }
    });
  }

  loadFriends(userId: string): void {
    this.userService.getFriendsByUserId(userId).subscribe({
      next: (friendsList) => {
        this.friends = friendsList;
        console.log('👥 Amigos cargados:', this.friends);
      },
      error: (err) => {
        console.error('❌ Error al cargar lista de amigos:', err);
      }
    });
  }

  loadAddedFriends(userId: string): void {
    this.userService.getFriendsByUserId(userId).subscribe({
      next: (friendsListB) => {
        this.addedFriends = friendsListB;
        console.log('👥 Amigos agregados cargados:', this.addedFriends);
      },
      error: (err) => {
        console.error('❌ Error al cargar lista de amigos agregados:', err);
      }
    });
  }


  loadUserPosts(userId: string): void {
    this.postService.getAllByParamId('userId', userId).subscribe({
      next: (posts) => {
        this.posts = posts.map(p => new Post(p));
        console.log('📝 Posts del usuario:', this.posts);
      },
      error: (err) => {
        console.error('❌ Error al cargar posts del usuario:', err);
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
        console.error('❌ Error al alternar like:', err);
      }
    });
  }

  setTab(tab: 'posts' | 'friends') {
    this.activeTab = tab;
  }

  handleAddFriendA(): void {
    if (!this.user) return;

    const emissorId = this.authService.getUserId();
    const receiverId = this.user._id;

    if (!emissorId || !receiverId) {
      console.error('❌ No se pudo obtener IDs para solicitud de amistad');
      return;
    }

    this.friendRequestService.createRequest(emissorId, receiverId).subscribe({
      next: () => {
        console.log('✅ Solicitud de amistad enviada');
      },
      error: (err) => {
        console.error('❌ Error al enviar solicitud de amistad:', err);
      }
    });
  }

  handleAddFriendB(friendId: string): void {
    const emissorId = this.authService.getUserId();
    const receiverId = friendId;

    if (!emissorId || !receiverId) {
      console.error('❌ No se pudo obtener IDs para solicitud de amistad');
      return;
    }

    this.friendRequestService.createRequest(emissorId, receiverId).subscribe({
      next: () => {
        console.log('✅ Solicitud de amistad enviada a', receiverId);
      },
      error: (err) => {
        console.error('❌ Error al enviar solicitud de amistad:', err);
      }
    });
  }


}
