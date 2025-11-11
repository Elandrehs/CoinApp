export class FriendRequest {
  _id: string;
  accepted: boolean;
  userIdEmissor: { _id: string; username: string; email: string };
  userIdReceiver: { _id: string; username: string; email: string };
  createdAt: string;

  constructor(req: any) {
    this._id = req._id || '';
    this.accepted = req.accepted ?? false;

    const defaultUser = (id: string) => ({
      _id: id,
      username: 'Usuario',
      email: 'email@example.com'
    });

    this.userIdEmissor = typeof req.userIdEmissor === 'string'
      ? defaultUser(req.userIdEmissor)
      : {
        _id: req.userIdEmissor._id,
        username: req.userIdEmissor.username || 'Usuario',
        email: req.userIdEmissor.email || 'email@example.com'
      };

    this.userIdReceiver = typeof req.userIdReceiver === 'string'
      ? defaultUser(req.userIdReceiver)
      : {
        _id: req.userIdReceiver._id,
        username: req.userIdReceiver.username || 'Usuario',
        email: req.userIdReceiver.email || 'email@example.com'
      };

    this.createdAt = req.createdAt || '';
  }
}
