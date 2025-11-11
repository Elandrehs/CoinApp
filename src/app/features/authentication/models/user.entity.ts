export class User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  rucEnterprise: string;
  role: string;
  friendsId: string[];
  friends: string[]; // puedes cambiar a User[] si luego haces populate en backend
  followers: string[];
  following: string[];
  registrationDate: string;
  lastLogin: string;

  constructor(user: {
    _id?: string;
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    rucEnterprise?: string;
    role?: string;
    friendsId?: string[];
    friends?: string[];
    followers?: string[];
    following?: string[];
    registrationDate?: string;
    lastLogin?: string;
  }) {
    this._id = user.id || user._id || ''; // <-- compatibilidad backend
    this.username = user.username || '';
    this.email = user.email || '';
    this.password = user.password || '';
    this.phone = user.phone || '';
    this.rucEnterprise = user.rucEnterprise || '';
    this.role = user.role || 'user';
    this.friendsId = user.friendsId || [];
    this.friends = user.friends || [];
    this.followers = user.followers || [];
    this.following = user.following || [];
    this.registrationDate = user.registrationDate || '';
    this.lastLogin = user.lastLogin || '';
  }
}
