import { Component, OnInit } from '@angular/core';
import { FriendListComponent } from '../../components/friend-list/friend-list.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../authentication/services/user.service';
import { User } from '../../../authentication/models/user.entity';
import { NgIf } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [FriendListComponent, NgIf, TranslatePipe],
  templateUrl: './friends-page.component.html',
  styleUrl: './friends-page.component.css'
})
export class FriendsPageComponent implements OnInit {
  friends: User[] = [];
  addedFriends: any[] = [];
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (!this.userId) {
      console.error('❌ No se encontró el ID del usuario');
      return;
    }

    this.userService.getFriendsByUserId(this.userId).subscribe({
      next: (friendsList) => {
        this.friends = friendsList;
        this.addedFriends = friendsList;
        console.log('👥 Amigos cargados:', friendsList);
      },
      error: (err) => {
        console.error('❌ Error al cargar la lista de amigos:', err);
      }
    });
  }
}
