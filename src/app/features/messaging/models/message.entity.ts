export class Message {
  _id: string;
  sender: { _id: string; username: string; email: string };
  recipient: { _id: string; username: string; email: string };
  content: string;
  read: boolean;
  sentAt: string;
  constructor(msg: Partial<Message>) {
    this._id = msg._id || '';
    this.sender = msg.sender || { _id: '', username: '', email: '' };
    this.recipient = msg.recipient || { _id: '', username: '', email: '' };
    this.content = msg.content || '';
    this.read = msg.read ?? false;
    this.sentAt = msg.sentAt || '';
  }
}
