import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../../authentication/models/user.entity';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [ClassicButtonComponent, TranslatePipe, NgIf],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  @Input() user!: User;
  @Input() isOwnProfile: boolean = false;
  @Input() postsCount: number = 0;

  @Output() addFriend = new EventEmitter<void>();

  getFriendsCount(): number {
    return this.user?.friendsId?.length || 0;
  }
}
