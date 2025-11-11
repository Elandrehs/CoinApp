// ✅ friend-request-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FriendRequestListComponent } from '../../components/friend-request-list/friend-request-list.component';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FriendRequestService } from '../../services/friend-request.service';
import { AuthService } from '../../../../shared/services/authentication.service';
import { FriendRequest } from '../../models/friend-request.entity';
import {UserService} from '../../../authentication/services/user.service';
import {Message} from '../../../messaging/models/message.entity';
import {MessageService} from '../../../messaging/services/message.service';

@Component({
  selector: 'app-friend-request-page',
  standalone: true,
  imports: [FriendRequestListComponent, NgIf, TranslatePipe],
  templateUrl: './friend-request-page.component.html',
  styleUrl: './friend-request-page.component.css'
})
export class FriendRequestPageComponent implements OnInit {
  activeTab: 'received' | 'sent' = 'received';
  receivedRequests: FriendRequest[] = [];
  sentRequests: FriendRequest[] = [];

  constructor(
    private friendRequestService: FriendRequestService,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.friendRequestService.getReceivedRequests(userId).subscribe({
      next: (requests) => {
        this.receivedRequests = requests.map(r => new FriendRequest(r));
        console.log('📥 Recibidas:', this.receivedRequests);
      },
      error: (err) => console.error('❌ Error al cargar solicitudes recibidas', err)
    });

    this.friendRequestService.getSentRequests(userId).subscribe({
      next: (requests) => {
        this.sentRequests = requests.map(r => new FriendRequest(r));
        console.log('📤 Enviadas:', this.sentRequests);
      },
      error: (err) => console.error('❌ Error al cargar solicitudes enviadas', err)
    });
  }

  setTab(tab: 'received' | 'sent') {
    this.activeTab = tab;
  }

  handleAccept(requestId: string): void {
    const request = this.receivedRequests.find(r => r._id === requestId);
    if (!request) {
      console.error('❌ No se encontró la solicitud');
      return;
    }

    const userIdReceiver = typeof request.userIdReceiver === 'string'
      ? request.userIdReceiver
      : request.userIdReceiver._id;

    const userIdEmissor = typeof request.userIdEmissor === 'string'
      ? request.userIdEmissor
      : request.userIdEmissor._id;

    this.friendRequestService.respondToRequest(requestId, true).subscribe({
      next: () => {
        // Actualiza UI
        this.receivedRequests = this.receivedRequests.map(r =>
          r._id === requestId ? { ...r, accepted: true } : r
        );
        console.log('✅ Solicitud aceptada:', requestId);

        // 2. Actualizar amigos del receptor
        this.userService.getFriendsByUserId(userIdReceiver).subscribe({
          next: (receiverFriends) => {
            const friendIds = receiverFriends
              .map(f => f._id)
              .filter((id): id is string => typeof id === 'string');

            if (!friendIds.includes(userIdEmissor)) {
              friendIds.push(userIdEmissor);
            }

            this.userService.updateFriends(userIdReceiver, friendIds).subscribe({
              next: () => console.log('✅ Amigos del receptor actualizados')
            });
          }
        });

// 3. Actualizar amigos del emisor
        this.userService.getFriendsByUserId(userIdEmissor).subscribe({
          next: (emissorFriends) => {
            const friendIds = emissorFriends
              .map(f => f._id)
              .filter((id): id is string => typeof id === 'string');

            if (!friendIds.includes(userIdReceiver)) {
              friendIds.push(userIdReceiver);
            }

            this.userService.updateFriends(userIdEmissor, friendIds).subscribe({
              next: () => {
                console.log('✅ Amigos del emisor actualizados');

                // ✅ Mensaje de bienvenida
                const payload = new Message({
                  sender: {
                    _id: userIdReceiver,
                    username: (request.userIdReceiver as any)?.username || 'Usuario',
                    email: (request.userIdReceiver as any)?.email || 'email@example.com'
                  },
                  recipient: {
                    _id: userIdEmissor,
                    username: (request.userIdEmissor as any)?.username || 'Usuario',
                    email: (request.userIdEmissor as any)?.email || 'email@example.com'
                  },
                  content: '¡Hola! Ahora somos amigos :D'
                });

                this.messageService.create(payload).subscribe({
                  next: () => console.log('📩 Mensaje de bienvenida enviado automáticamente'),
                  error: err => console.error('❌ Error al enviar mensaje automático', err)
                });
              }
            });
          }
        });

      },
      error: (err) => console.error('❌ Error al aceptar solicitud', err)
    });
  }




}
