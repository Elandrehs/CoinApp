import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import {NgForOf, NgIf} from '@angular/common';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../../authentication/models/user.entity';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [
    AvatarComponent,
    NgForOf,
    ClassicButtonComponent,
    TranslatePipe,
    NgIf
  ],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css'
})
export class FriendListComponent {
  @Input() friends: User[] = [];
  @Input() addedFriends: User[] = []; // amigos del usuario logueado
  @Output() addFriend = new EventEmitter<string>(); // ✅ string, no void

  constructor(private router: Router) {}

  handleGoToProfile(event: MouseEvent, friend: User): void {
    if (!friend._id) {
      console.error('❌ No se puede navegar: friend._id es undefined', friend);
      return;
    }
    event.stopPropagation();
    this.router.navigate(['/main/profile', friend._id]);
  }

  isAlreadyFriend(friend: User): boolean {
    return this.addedFriends.some((added) => added._id === friend._id);
  }

}
