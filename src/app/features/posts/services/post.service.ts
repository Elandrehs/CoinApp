import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import {Post} from '../models/post.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post> {
  constructor() {
    super();
    this.resourceEndpoint = environment.postsEndpointPath;
  }
  toggleLike(postId: string): Observable<any> {
    return this.updateParamById(postId, 'likes', {});
  }

}
