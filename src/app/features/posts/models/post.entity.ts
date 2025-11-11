export class Post {
  _id: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  privacy: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  author: {
    _id: string;
    username: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: string[];
  likesCount: number;
  commentsCount: number;

  constructor(post: any) {
    this._id = post._id || post.id || '';
    this.title = post.title || '';
    this.content = post.content || '';
    this.images = post.images || [];
    this.tags = post.tags || [];
    this.privacy = post.privacy || 'public';
    this.location = post.location || { name: '', coordinates: [0, 0] };

    this.author = {
      _id: post.author?._id || post.author?.id || '',
      username: post.author?.username || '',
      email: post.author?.email || undefined
    };

    this.createdAt = post.createdAt || '';
    this.updatedAt = post.updatedAt || '';
    this.likes = post.likes || [];
    this.likesCount = post.likesCount ?? 0;
    this.commentsCount = post.commentsCount ?? 0;
  }
}
