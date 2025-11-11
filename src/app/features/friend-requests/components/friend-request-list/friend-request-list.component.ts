import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ClassicButtonComponent
} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {
  AvatarComponent
} from '../../../../shared/components/avatar/avatar.component';
import {
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Router
} from '@angular/router';
import {
  TranslatePipe
} from '@ngx-translate/core';
import {
  FriendRequest
} from '../../models/friend-request.entity';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css'],
  standalone: true,
  imports: [
    ClassicButtonComponent,
    AvatarComponent,
    NgForOf,
    NgIf,
    TranslatePipe
  ]
})
export class FriendRequestListComponent {
  @Input() type: 'received' | 'sent' = 'received';
  @Input() requests: FriendRequest[] = [];

  @Output() accepted = new EventEmitter<string>();

  constructor(private router: Router) {}

  acceptRequest(requestId: string): void {
    this.accepted.emit(requestId);
  }

  handleGoToProfile(event: MouseEvent, request: FriendRequest): void {
    event.stopPropagation();

    const friendId =
      this.type === 'received'
        ? request.userIdEmissor._id
        : request.userIdReceiver._id;

    if (!friendId) {
      console.error('❌ No se puede navegar al perfil: ID indefinido');
      return;
    }

    this.router.navigate(['/main/profile', friendId]);
  }

}
