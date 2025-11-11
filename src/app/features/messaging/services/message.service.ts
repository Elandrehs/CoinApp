import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Message } from '../models/message.entity';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService<Message> {

  constructor() {
    super();
    this.resourceEndpoint = environment.messagesEndpointPath; // Asegúrate que sea '/messages'
  }
  markAsRead(id: string): Observable<any> {
    return this.patchParamById(id, 'read', {});
  }
  getConversation(senderId: string, receiverId: string): Observable<Message[]> {
    const queryParams = { senderId, receiverId };
    return this.getByQueryParams(queryParams);
  }
}
