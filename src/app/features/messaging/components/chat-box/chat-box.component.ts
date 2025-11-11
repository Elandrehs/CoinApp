import {Component, Input} from '@angular/core';
import {IconButtonComponent} from '../../../../shared/components/buttons/icon-button/icon-button.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [
    IconButtonComponent,
    FormsModule
  ],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  @Input() currentUser!: any;
  @Input() conversation!: any;
  @Input() onBack!: () => void;
}
