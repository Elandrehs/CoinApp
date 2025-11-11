import { Injectable } from '@angular/core';
import {BaseService} from '../../../shared/services/base.service';
import {FriendRequest} from '../models/friend-request.entity';
import {environment} from '../../../../environments/environment';
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService extends BaseService<FriendRequest>{
  constructor() {
    super();
    this.resourceEndpoint = environment.friendRequestsEndpointPath;
  }
  getReceivedRequests(userId: string): Observable<FriendRequest[]> {
    return this.getAllByParamId('receiverId', userId);
  }

  getSentRequests(userId: string): Observable<FriendRequest[]> {
    return this.getAllByParamId('emissorId', userId);
  }

  respondToRequest(requestId: string, accepted: boolean): Observable<any> {
    return this.updateParamById(requestId, 'accepted', { accepted });
  }

  createRequest(emissorId: string, receiverId: string): Observable<FriendRequest> {
    const payload = {
      userIdEmissor: emissorId,
      userIdReceiver: receiverId
    };
    return this.http.post<FriendRequest>(this.resourcePath(), JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



}
