import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Comment } from '../models/comment.entity';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService extends BaseService<Comment> {
  constructor() {
    super();
    this.resourceEndpoint = environment.commentsEndpointPath;
  }
}
