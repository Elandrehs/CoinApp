// messaging-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { MessageFormComponent } from '../message-form/message-form.component';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../../../shared/services/authentication.service';
import { UserService } from '../../../authentication/services/user.service';
import { User } from '../../../authentication/models/user.entity';
import { Message } from '../../models/message.entity';

@Component({
  selector: 'app-messaging-panel',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ChatListComponent,
    ChatBoxComponent,
    MessageBubbleComponent,
    MessageFormComponent
  ],
  templateUrl: './messaging-panel.component.html',
  styleUrl: './messaging-panel.component.css'
})
export class MessagingPanelComponent implements OnInit {
  selectedChat: { user: User, messages: Message[] } | null = null;
  currentUser!: User;
  chats: { user: User, lastMessage: Message }[] = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.userService.getById(userId).subscribe({
      next: user => {
        this.currentUser = user;
        this.loadAllMessages();
      },
      error: err => console.error('❌ Error al cargar usuario logueado', err)
    });
  }

  toggleChecked(): boolean {
    const input = document.getElementById('messaging-panel-toggle') as HTMLInputElement;
    return input?.checked ?? false;
  }

  handleChatClick(chat: { user: User, lastMessage: Message }): void {
    const chatUser = chat.user;
    if (!this.currentUser?._id || !chatUser._id) return;
    this.messageService.getConversation(this.currentUser._id, chatUser._id).subscribe({
      next: (conversation) => {
        this.selectedChat = {
          user: chatUser,
          messages: conversation
        };
      },
      error: err => console.error('❌ Error al obtener conversación', err)
    });
  }

  handleBack = () => {
    this.selectedChat = null;
  };

  handleSendMessage(messageText: string): void {
    if (!this.selectedChat || !this.currentUser) return;

    const recipient = this.selectedChat.user;
    const payload = new Message({
      sender: {
        _id: this.currentUser._id!,
        username: this.currentUser.username,
        email: this.currentUser.email
      },
      recipient: {
        _id: recipient._id!,
        username: recipient.username,
        email: recipient.email
      },
      content: messageText
    });

    this.messageService.create(payload).subscribe({
      next: (savedMessage) => {
        this.selectedChat?.messages.push(new Message(savedMessage));
      },
      error: err => console.error('❌ Error al enviar mensajee', err)
    });
  }


  loadAllMessages(): void {
    this.messageService.getAll().subscribe({
      next: (allMessages) => {
        const chatMap = new Map<string, Message>();

        allMessages.forEach(msg => {
          const otherUser = (msg.sender as any)._id === this.currentUser._id
            ? msg.recipient as User
            : msg.sender as User;

          const key = otherUser._id!;
          const prev = chatMap.get(key);
          chatMap.set(key, msg);

          if (!prev || new Date(msg.sentAt!) > new Date(prev.sentAt!)) {
            chatMap.set(key, msg);
          }
        });

        this.chats = Array.from(chatMap.entries()).map(([_, lastMessage]) => {
          const user = (lastMessage.sender as any)._id === this.currentUser._id
            ? lastMessage.recipient as User
            : lastMessage.sender as User;
          return { user, lastMessage };
        });
      },
      error: err => console.error('❌ Error al cargar mensajes', err)
    });
  }

}
