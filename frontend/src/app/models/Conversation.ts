import { User } from 'src/app/models/user.model';

export interface Conversation {
  id?: number;
  users?: User[];
  lastUpdated?: Date;
}
