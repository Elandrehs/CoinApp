import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { User } from '../models/user.entity';
import {Observable, retry} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor() {
    super();
    this.resourceEndpoint = environment.usersEndpointPath;
  }

  register(userPayload: {
    username: string;
    password: string;
    phone: string;
    email: string;
    rucEnterprise: string;
  }): Observable<any> {
    const url = `${this.serverBaseUrl}${environment.registerEndpointPath}`;

    const payloadWithRole = {
      ...userPayload,
      role: 'user'
    };

    return this.http.post(url, JSON.stringify(payloadWithRole), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string; id: string }> {
    const url = `${this.serverBaseUrl}${environment.loginEndpointPath}`;
    return this.http.post<{ token: string; id: string }>(
      url,
      JSON.stringify(credentials),
      this.httpOptions
    ).pipe(retry(2), catchError(this.handleError));
  }

  getFriendsByUserId(userId: string): Observable<User[]> {
    return this.getParamByResId(userId, 'friendsId');
  }

  updateFriends(userId: string, updatedList: string[]): Observable<any> {
    return this.updateParamById(userId, 'friendsId', { friendsId: updatedList });
  }

}
