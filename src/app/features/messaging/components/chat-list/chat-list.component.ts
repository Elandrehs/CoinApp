import {Component, Input} from '@angular/core';
import { Router} from '@angular/router';
import {AvatarComponent} from '../../../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    AvatarComponent
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent  {
  constructor(private router: Router) {
  }
  @Input() username!: string;
  @Input() email!: string;
  @Input() message!: string;
  @Input() messageType!: 'received' | 'sent';
  @Input() sentAt!: string; // formato ISO

  handleGoToProfile(event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/main/profile']);
  }
}
