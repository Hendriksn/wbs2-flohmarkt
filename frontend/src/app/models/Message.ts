import { User } from 'src/app/models/user.model';
import { Conversation } from 'src/app/models/Conversation';

export interface Message {
  id?: number;
  message?: string;
  user?: User;
  conversation?: Conversation;
  createdAt?: Date;
}
