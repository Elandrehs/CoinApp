import { Component, EventEmitter, Output } from '@angular/core';
import { IconButtonComponent } from '../../../../shared/components/buttons/icon-button/icon-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [
    IconButtonComponent,
    FormsModule
  ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  messageContent = '';

  @Output() sendMessage = new EventEmitter<string>();

  handleSend(): void {
    if (!this.messageContent.trim()) return;

    this.sendMessage.emit(this.messageContent.trim());
    this.messageContent = '';
  }
}
