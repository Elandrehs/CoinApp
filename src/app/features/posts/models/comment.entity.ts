export class Comment {
  _id: string;
  content: string;
  postId: string;
  userId: {
    _id: string;
    username: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;

  constructor(comment: any) {
    this._id = comment._id || comment.id || '';
    this.content = comment.content || '';
    this.postId = comment.postId || '';
    this.userId = {
      _id: comment.userId?._id || comment.userId?.id || '',
      username: comment.userId?.username || '',
      email: comment.userId?.email || undefined
    };
    this.createdAt = comment.createdAt || '';
    this.updatedAt = comment.updatedAt || '';
  }
}
